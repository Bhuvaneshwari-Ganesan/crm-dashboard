"use client";
import { Sale } from "@/types/sale";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CompanyDetails from "./components/CompanyDetails";
import SalesTable from "./components/SalesTable";
import SalePreview from "./components/SalePreview";




export default function Home() {
  const [activeSale, setActiveSale] = useState<Sale | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <CompanyDetails />

        <div className="flex gap-4 px-4 pb-4 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <SalesTable
              activeSale={activeSale}
              onSelectSale={setActiveSale}
            />
          </div>

          <div className="w-[320px] shrink-0">
            <SalePreview sale={activeSale} />
          </div>
        </div>
      </div>
    </div>
  );
}
