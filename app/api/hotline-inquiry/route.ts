import { NextResponse } from "next/server";
import { submitHotlineEntry } from "@/app/actions/submitHotline";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitHotlineEntry(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API hotline inquiry error:", error);
    return NextResponse.json({ success: false, error: "Submission failed." }, { status: 500 });
  }
}
