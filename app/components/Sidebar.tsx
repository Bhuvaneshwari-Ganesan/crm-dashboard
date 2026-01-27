"use client";

export default function Sidebar() {
  return (
    <aside className="w-14 bg-emerald-700 text-white flex flex-col items-center py-4 gap-6">
      <div className="font-bold text-lg">L</div>

      <button>🏠</button>
      <button>📊</button>
      <button>👤</button>
      <button>⚙️</button>

      <div className="mt-auto mb-2 w-8 h-8 rounded-full bg-black flex items-center justify-center">
        N
      </div>
    </aside>
  );
}
