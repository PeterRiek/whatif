import { NextResponse } from "next/server";
import mock_data from "@/scripts/out.json"
const API_KEY = process.env.FINNHUB_API_KEY;

export async function GET(req: Request, { params }: any) {
  // const symbol = (await params).symbol;
  // const { searchParams } = new URL(req.url);
  // const from = searchParams.get("from");
  // const to = searchParams.get("to");

  return NextResponse.json(mock_data);
}
