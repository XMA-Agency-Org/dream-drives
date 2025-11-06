import { getCategories } from "@/app/(public)/vehicles/_actions/category-actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json([{ id: "all", label: "All Vehicles" }], { status: 500 });
  }
}

