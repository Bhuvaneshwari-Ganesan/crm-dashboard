"use client";

export default function CompanyDetails() {
  return (
    <div className="bg-white border rounded-xl p-5 mx-4 mt-4">
      <h2 className="font-semibold text-lg">
        SuperCompany Ltd ASA
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Department Stockholm
      </p>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <p><strong>Address:</strong> Västgötagatan 5</p>
        <p><strong>Country:</strong> Sweden</p>
        <p><strong>Phone:</strong> +46 800 193 2820</p>
        <p><strong>Category:</strong> Customer A</p>
        <p><strong>VAT:</strong> SE123456789</p>
        <p><strong>Business:</strong> IT</p>
      </div>
    </div>
  );
}
