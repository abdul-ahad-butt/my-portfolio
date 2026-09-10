// NextGenDialCard.jsx
export default function NextGenDialCard() {
  return (
    <div className="flex flex-col p-6 rounded-2xl bg-[#0f1523] border border-[#1e293b] hover:border-[#334155] transition-all w-full h-full">
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-4">
          {/* Icon Container */}
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[1.15rem] font-bold text-white leading-tight mb-1">Automated Outbound Dialer</h3>
            <p className="text-sm font-medium text-orange-400">on Cloudflare & Telnyx</p>
          </div>
        </div>
        
        {/* Link Arrow */}
        <a href="https://github.com/abdul-ahad-butt/nextgendial-Dailer" target="_blank" rel="noopener noreferrer" className="text-[#64748b] hover:text-orange-400 transition-colors mt-1" aria-label="View NextGenDial Repository">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      <p className="text-[#94a3b8] text-[0.9rem] leading-relaxed mb-6">
        An automated outbound dialing platform engineered on a serverless stack using Cloudflare Workers, D1, and Pages. Features comprehensive admin lead management, real-time status monitoring, and seamless Telnyx telephony integration with WebRTC softphone capabilities.
      </p>

      {/* Bullet Points */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[0.85rem] text-[#cbd5e1] mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
          Telnyx WebRTC softphone
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
          Real-time state monitoring
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
          CSV/Excel lead batching
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
          Serverless auth & routing
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-[#1e293b]">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 text-[0.75rem] font-medium text-orange-400 bg-orange-500/5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Telephony
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 text-[0.75rem] font-medium text-orange-400 bg-orange-500/5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
          Serverless Stack
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 text-[0.75rem] font-medium text-orange-400 bg-orange-500/5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          Core Engineering
        </span>
      </div>
    </div>
  );
}
