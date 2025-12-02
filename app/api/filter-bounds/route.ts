import { getFilterBounds } from "@/lib/contentful-api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bounds = await getFilterBounds();
    return NextResponse.json(bounds);
  } catch (error) {
    console.error('Error fetching filter bounds:', error);
    return NextResponse.json({
      minPrice: 0,
      maxPrice: 10000,
      minYear: 2020,
      maxYear: new Date().getFullYear() + 1,
    }, { status: 500 });
  }
}

