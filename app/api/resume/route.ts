import { NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";

export async function GET() {
    try {
        const conn = await getSalesforceConnection();

        const query = `
      SELECT Id, VersionData, FileExtension 
      FROM ContentVersion 
      WHERE Title = 'Resume' 
      AND IsLatest = true 
      LIMIT 1
    `;

        const result = await conn.query<{
            Id: string;
            VersionData: string;
            FileExtension: string;
        }>(query);

        if (result.records.length === 0) {
            return new NextResponse("Resume not found in Salesforce", {
                status: 404,
            });
        }

        const record = result.records[0];

        const fileUrl = `${conn.instanceUrl}${record.VersionData}`;

        const response = await fetch(fileUrl, {
            headers: {
                Authorization: `Bearer ${conn.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
        }

        const fileBuffer = await response.arrayBuffer();

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="Sohel_Azmi_Resume.${record.FileExtension}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("Resume Download Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
