import { NextRequest, NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";
import sharp from "sharp";

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
            console.error("Failed to fetch image from Salesforce:", response.statusText);
            return new NextResponse("Failed to fetch image", { status: response.status });
        }

        const imageArrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);

        const optimizedBuffer = await sharp(imageBuffer)
            .resize(108, 108, { 
                fit: 'cover', 
                withoutEnlargement: true 
            }) 
            .webp({ quality: 80 }) 
            .toBuffer();

        return new NextResponse(optimizedBuffer as any, {
            headers: {
                "Content-Type": "image/webp",
                "Cache-Control": "public, max-age=86400, stale-while-revalidate=60",
            },
        });

    } catch (error) {
        console.error("Error proxying image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}