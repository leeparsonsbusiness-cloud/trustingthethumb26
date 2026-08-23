import { NextResponse } from "next/server";
import { submitSponsorInquiry } from "@/app/actions/submitSponsor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitSponsorInquiry(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API sponsor inquiry error:", error);
    return NextResponse.json({ success: false, error: "Submission failed." }, { status: 500 });
  }
}
