import { NextRequest, NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
        return new NextResponse("Missing URL parameter", { status: 400 });
    }

    try {
        const conn = await getSalesforceConnection();

        const response = await fetch(imageUrl, {
            headers: {
                Authorization: `Bearer ${conn.accessToken}`,
                "Content-Type": "image/jpeg",
            },
        });

        if (!response.ok) {
            console.error(
                "Failed to fetch image from Salesforce:",
                response.statusText
            );
            return new NextResponse("Failed to fetch image", {
                status: response.status,
            });
        }

        const imageBuffer = await response.arrayBuffer();
        const contentType =
            response.headers.get("content-type") || "image/jpeg";

        return new NextResponse(imageBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400", // Cache for 1 day
            },
        });
    } catch (error: any) {
        console.error("Error proxying image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}