import { NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and Email are required" },
                { status: 400 }
            );
        }

        const conn = await getSalesforceConnection();

        // Split name into First/Last for Salesforce (simple logic)
        const nameParts = name.split(" ");
        const firstName = nameParts.length > 1 ? nameParts[0] : "";
        const lastName =
            nameParts.length > 1 ? nameParts.slice(1).join(" ") : name;

        // Insert into Salesforce Lead object
        const result = await conn.sobject("Lead").create({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Description: message, // The message goes here
            Company: "Portfolio Inquiry", // MANDATORY FIELD in Salesforce
            LeadSource: "Web",
            Status: "Open - Not Contacted",
        });

        if (result.success) {
            return NextResponse.json({ success: true, id: result.id });
        } else {
            console.error("Salesforce Error:", result.errors);
            return NextResponse.json(
                { error: "Failed to create lead" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}