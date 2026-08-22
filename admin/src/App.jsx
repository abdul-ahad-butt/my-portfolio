import { useState, useEffect } from 'react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://my-portfolio.abdulahadbutt420.workers.dev';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
      } else {
        setError('Login failed: Invalid credentials');
      }
    } catch (err) {
      setError('Login error: ' + err.message);
    }
    setLoading(false);
  };

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/inquiries`, {
        headers: {
          'x-admin-key': token
        }
      });
      if (res.status === 401) {
        setToken('');
        localStorage.removeItem('adminToken');
        setError('Session expired');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      setError('Error loading inquiries: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadInquiries();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="App">
        <h1>Admin Login</h1>
        <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <button onClick={() => { setToken(''); localStorage.removeItem('adminToken'); }}>Logout</button>
      <button onClick={loadInquiries}>Refresh</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(inq => (
            <tr key={inq.id}>
              <td>{inq.name}</td>
              <td>{inq.email}</td>
              <td>{inq.subject}</td>
              <td>{inq.status}</td>
              <td>{new Date(inq.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
