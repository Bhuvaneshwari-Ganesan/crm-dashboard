import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Sale from "@/models/Sale";

export async function GET() {
  try {
    await connectDB();
    const sales = await Sale.find();
    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const sale = await Sale.create(body);
    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}
