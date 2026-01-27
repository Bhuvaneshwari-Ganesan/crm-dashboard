export default function Tabs() {
  return (
    <div className="flex gap-6 text-sm mt-4 border-b">
      {["Company", "Activities", "Contacts", "Sales", "Requests"].map(tab => (
        <button
          key={tab}
          className={`pb-2 ${
            tab === "Sales"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
