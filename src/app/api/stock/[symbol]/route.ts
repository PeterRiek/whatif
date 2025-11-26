"use server";

import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params;

    const searchParams = req.nextUrl.searchParams;
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const interval = searchParams.get("interval");

    if (!start || !end || !interval) {
      return NextResponse.json(
        { error: "Missing required parameters: start, end, interval" },
        { status: 400, headers: corsHeaders }
      );
    }

    const url = `https://api.ahqu.de:2096/api/stock/${symbol}?start=${start}&end=${end}&interval=${interval}`;
    console.log(url);
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error (${response.status})` },
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
