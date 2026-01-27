"use client";

import { useState } from "react";
import { Sale } from "@/types/sale";


export default function AddSaleModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (sale: Sale) => void;
}) {
  const [form, setForm] = useState({
    saleName: "",
    amount: "",
    stage: "",
    nextActivity: "",
  });

  const handleSave = async () => {
    if (!form.saleName || !form.amount) return;

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Open",
        saleDate: new Date().toLocaleDateString(),
        amount: Number(form.amount),
        stage: form.stage,
        nextActivity: form.nextActivity,
        saleName: form.saleName,
      }),
    });

    const savedSale = await res.json();
    onSave(savedSale);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 className="font-semibold mb-4">Add Sale</h3>

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Sale Name"
          onChange={(e) =>
            setForm({ ...form, saleName: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Amount"
          type="number"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Stage"
          onChange={(e) =>
            setForm({ ...form, stage: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Next Activity"
          onChange={(e) =>
            setForm({ ...form, nextActivity: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
