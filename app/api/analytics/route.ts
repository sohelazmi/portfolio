import { NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const conn = await getSalesforceConnection();

        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

        const visitorHash = crypto
            .createHash("sha256")
            .update(ip)
            .digest("hex");

        await conn.sobject("Site_Visit__c").create({
            Source__c: "Portfolio Home",
            Visitor_Hash__c: visitorHash,
        });

        const [totalResult, uniqueResult] = await Promise.all([
            conn.query("SELECT Count() FROM Site_Visit__c"),

            conn.query(
                "SELECT COUNT_DISTINCT(Visitor_Hash__c) FROM Site_Visit__c"
            ),
        ]);

        return NextResponse.json({
            totalViews: totalResult.totalSize,
            uniqueVisitors: uniqueResult.records[0].expr0,
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ count: null }, { status: 500 });
    }
}
