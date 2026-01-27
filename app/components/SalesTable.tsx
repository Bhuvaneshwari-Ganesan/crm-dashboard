"use client";
import { Sale } from "@/types/sale";
import { useEffect, useState } from "react";
import AddSaleModal from "./AddSaleModal";
import Pagination from "./Pagination";



export default function SalesTable({
  activeSale,
  onSelectSale,
}: {
  activeSale: Sale | null;
  onSelectSale: (sale: Sale) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [originalSales, setOriginalSales] = useState<Sale[]>([]);

  // ✅ FETCH SALES FROM MONGODB
  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setOriginalSales(data); // keep copy for reset after filter
      })
      .catch(() => console.error("Failed to fetch sales"));
  }, []);

  // ✅ DELETE HANDLER
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one sale to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete selected sales?")) return;

    await Promise.all(
      selectedIds.map((id) =>
        fetch(`/api/sales/${id}`, { method: "DELETE" })
      )
    );

    setSales((prev) =>
      prev.filter((sale) => !selectedIds.includes(sale._id!))
    );
    setOriginalSales((prev) =>
      prev.filter((sale) => !selectedIds.includes(sale._id!))
    );
    setSelectedIds([]);
  };

  // ✅ FILTER HANDLER (Open sales only)
  const handleFilter = () => {
    setSales(originalSales.filter((sale) => sale.status === "Open"));
  };

  // ✅ EXPORT HANDLER (CSV)
  const handleExport = () => {
    if (sales.length === 0) {
      alert("No data to export");
      return;
    }

    const csv =
      "Sale Name,Amount,Status,Stage,Next Activity\n" +
      sales
        .map(
          (s) =>
            `${s.saleName},${s.amount},${s.status},${s.stage},${s.nextActivity}`
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
  };

  const statusStyles: Record<string, string> = {
    Open: "bg-emerald-100 text-emerald-700",
    Sold: "bg-blue-100 text-blue-700",
    Lost: "bg-red-100 text-red-700",
    Stalled: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h3 className="font-semibold text-sm">Sales</h3>
        <button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700"
        >
          + New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="w-10 px-3 py-2 text-center">
                <input type="checkbox" disabled />
              </th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2">Sale date</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Stage</th>
              <th className="px-3 py-2">Next activity</th>
              <th className="px-3 py-2">Sale name</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale._id}
                onClick={() => onSelectSale(sale)}
                className={`border-b cursor-pointer hover:bg-emerald-50 ${
                  activeSale?._id === sale._id ? "bg-emerald-50" : ""
                }`}
              >
                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(sale._id!)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds((prev) => [...prev, sale._id!]);
                      } else {
                        setSelectedIds((prev) =>
                          prev.filter((id) => id !== sale._id)
                        );
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[sale.status]
                    }`}
                  >
                    <span className="w-2 h-2 bg-current rounded-full" />
                    {sale.status}
                  </span>
                </td>

                <td className="px-3 py-3">{sale.saleDate}</td>
                <td className="px-3 py-3">€ {sale.amount}</td>
                <td className="px-3 py-3">{sale.stage}</td>
                <td className="px-3 py-3">{sale.nextActivity}</td>
                <td className="px-3 py-3">{sale.saleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action bar */}
      <div className="flex gap-6 px-4 py-3 text-sm text-gray-500 border-t">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 hover:text-emerald-600"
        >
          ➕ Add
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 hover:text-red-600"
        >
          🗑 Delete
        </button>

        <button
          onClick={handleFilter}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          🔍 Filter
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-1 hover:text-gray-800"
        >
          ⬇ Export
        </button>
      </div>

      <Pagination />

      {open && (
        <AddSaleModal
          onClose={() => setOpen(false)}
          onSave={(savedSale) => {
            setSales((prev) => [...prev, savedSale]);
            setOriginalSales((prev) => [...prev, savedSale]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
