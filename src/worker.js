const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      });
    }

    // 2. Route: API endpoints
    if (url.pathname.startsWith('/api/inquiries') || url.pathname.startsWith('/api/auth')) {
      return handleApiRequest(request, env, url).catch(err => {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      });
    }

    // 3. Fallback: serve static assets built by Vite
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response('Asset not found', { status: 404 });
    }
  },
};

async function handleApiRequest(request, env, url) {
  const method = request.method;

  // GET: Initialize Database Schema (Auto-setup)
  if (method === 'GET' && url.pathname === '/api/init-db') {
    if (!env.DB) return new Response('Database not bound', { status: 503 });
    try {
      await env.DB.exec(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'unread',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
      return new Response(JSON.stringify({ success: true, message: "Database schema applied successfully!" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
  }
  
  // POST: Create new inquiry (Public)
  if (method === 'POST') {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured. Please add D1 database ID in wrangler.toml.' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO inquiries (id, name, email, subject, message, status) VALUES (?, ?, ?, ?, ?, 'unread')`
    ).bind(id, name, email, subject, message).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // POST: Login (Public)
  if (method === 'POST' && url.pathname === '/api/auth/login') {
    const body = await request.json();
    const { username, password } = body;
    
    // Default credentials if not set in environment
    const validUsername = env.ADMIN_USERNAME || 'Abdul Ahad Butt';
    const validPassword = env.ADMIN_PASSWORD || 'Ahad-(Butt)Dispatch';

    if (username !== validUsername || password !== validPassword) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials.' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    
    return new Response(JSON.stringify({ success: true, token: env.ADMIN_KEY }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // All other routes require authentication
  const adminKey = request.headers.get('X-Admin-Key');
  if (!adminKey || adminKey !== env.ADMIN_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }

  // GET: Fetch all inquiries (Admin)
  if (method === 'GET') {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const { results } = await env.DB.prepare(
      `SELECT * FROM inquiries ORDER BY created_at DESC`
    ).all();
    
    // Map SQLite snake_case to frontend camelCase
    const mapped = results.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      status: row.status,
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({ success: true, data: mapped }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // PATCH: Update status (Admin)
  if (method === 'PATCH') {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const id = url.pathname.split('/').pop();
    const body = await request.json();
    if (!id || !body.status) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    await env.DB.prepare(`UPDATE inquiries SET status = ? WHERE id = ?`).bind(body.status, id).run();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // DELETE: Remove inquiry (Admin)
  if (method === 'DELETE') {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const id = url.pathname.split('/').pop();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    await env.DB.prepare(`DELETE FROM inquiries WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // POST (Bulk Actions): Update/Delete multiple inquiries (Admin)
  if (method === 'POST' && url.pathname.endsWith('/bulk')) {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const body = await request.json();
    const { action, ids } = body;
    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid bulk request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const placeholders = ids.map(() => '?').join(',');
    
    if (action === 'delete') {
      await env.DB.prepare(`DELETE FROM inquiries WHERE id IN (${placeholders})`).bind(...ids).run();
    } else if (['unread', 'read', 'archived'].includes(action)) {
      await env.DB.prepare(`UPDATE inquiries SET status = ? WHERE id IN (${placeholders})`).bind(action, ...ids).run();
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}
