"use client";

import { useEffect, useState } from "react";
import { Sale } from "@/types/sale";
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
  const [originalSales, setOriginalSales] = useState<Sale[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ✅ FETCH SALES FROM API (SAFE)
  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSales(data);
          setOriginalSales(data);
        } else {
          setSales([]);
          setOriginalSales([]);
        }
      })
      .catch(() => {
        setSales([]);
        setOriginalSales([]);
      });
  }, []);

  // ✅ DELETE HANDLER
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Select at least one sale to delete");
      return;
    }

    if (!confirm("Are you sure?")) return;

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

  // ✅ FILTER (OPEN ONLY)
  const handleFilter = () => {
    setSales(originalSales.filter((sale) => sale.status === "Open"));
  };

  // ✅ EXPORT CSV
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
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          + New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 py-2">
                <input type="checkbox" disabled />
              </th>
              <th>Status</th>
              <th>Sale Date</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Next Activity</th>
              <th>Sale Name</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale._id}
                onClick={() => onSelectSale(sale)}
                className={`border-b hover:bg-emerald-50 cursor-pointer ${
                  activeSale?._id === sale._id ? "bg-emerald-50" : ""
                }`}
              >
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(sale._id!)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, sale._id!]
                          : prev.filter((id) => id !== sale._id)
                      )
                    }
                  />
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      statusStyles[sale.status]
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>

                <td>{sale.saleDate}</td>
                <td>€ {sale.amount}</td>
                <td>{sale.stage}</td>
                <td>{sale.nextActivity}</td>
                <td>{sale.saleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action bar */}
      <div className="flex gap-6 px-4 py-3 border-t text-sm">
        <button onClick={() => setOpen(true)}>➕ Add</button>
        <button onClick={handleDelete} className="text-red-600">
          🗑 Delete
        </button>
        <button onClick={handleFilter}>🔍 Filter</button>
        <button onClick={handleExport}>⬇ Export</button>
      </div>

      <Pagination />

      {open && (
        <AddSaleModal
          onClose={() => setOpen(false)}
          onSave={(sale) => {
            setSales((prev) => [...prev, sale]);
            setOriginalSales((prev) => [...prev, sale]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
