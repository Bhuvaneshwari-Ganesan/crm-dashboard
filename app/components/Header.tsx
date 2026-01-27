"use client";

export default function Header() {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 justify-between">
      <input
        placeholder="Search for anything"
        className="border rounded px-3 py-1 w-[360px]"
      />

      <div className="flex gap-4">
        🔔
        👤
      </div>
    </header>
  );
}
