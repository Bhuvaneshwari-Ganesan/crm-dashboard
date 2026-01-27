"use client";

import { Sale } from "@/types/sale";


export default function SalePreview({ sale }: { sale: Sale | null }) {
  if (!sale) {
    return (
      <div className="bg-white border rounded-xl p-4 text-sm text-gray-500">
        Select a sale to preview
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden text-sm">
      {/* 🔹 TOP HEADER */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Preview
        </span>

        <div className="flex gap-3 text-gray-500">
          <button title="Edit">✏️</button>
          <button title="Calendar">📅</button>
          <button title="Task">📋</button>
          <button title="Favorite">⭐</button>
          <button title="More">⋮</button>
        </div>
      </div>

      {/* 🔹 CONTENT */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">
            {sale.saleName}
          </h3>
          <p className="font-medium text-gray-900">€ {sale.amount}</p>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p><span className="font-medium">Company:</span> SuperCompany Ltd ASA</p>
          <p><span className="font-medium">Contact:</span> Peter Elliot</p>
          <p><span className="font-medium">Sale date:</span> {sale.saleDate}</p>
          <p><span className="font-medium">Owner:</span> Eric Davies</p>
          <p><span className="font-medium">Status:</span> {sale.status}</p>
          <p><span className="font-medium">Stage:</span> {sale.stage}</p>
        </div>

        <hr />

        {/* Activities */}
        <div>
          <h4 className="font-semibold mb-1">Activities</h4>
          <ul className="space-y-1 text-blue-600">
            <li>04/11/2024 – Follow-up call</li>
            <li>01/11/2024 – Quote sent</li>
            <li>29/10/2024 – Prospect meeting</li>
          </ul>
        </div>

        <hr />

        {/* Stakeholders */}
        <div>
          <h4 className="font-semibold mb-1">Stakeholders</h4>
          <p>James Vargas</p>
          <p>Lisa Jansson</p>
        </div>
      </div>
    </div>
  );
}
