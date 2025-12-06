import jsforce from "jsforce";

// Define the interface for our Blog Post
export interface BlogPost {
    Id: string;
    Name: string; // The Title
    Slug__c: string;
    Summary__c: string;
    Content__c: string;
    Published_Date__c: string;
}

export interface SalesforceUser {
    Name: string;
    Title: string;
    AboutMe: string;
    FullPhotoUrl: string;
    CompanyName: string;
}

let connection: jsforce.Connection | null = null;

export const getSalesforceConnection = async () => {
    if (connection) return connection;

    const conn = new jsforce.Connection({
        loginUrl: process.env.SF_LOGIN_URL,
    });

    await conn.login(
        process.env.SF_USERNAME!,
        process.env.SF_PASSWORD! + process.env.SF_TOKEN!
    );

    connection = conn;
    return conn;
};

// Function to fetch all published blogs
export const getPublishedBlogs = async (): Promise<BlogPost[]> => {
    const conn = await getSalesforceConnection();

    // SOQL Query
    const query = `
    SELECT Id, Name, Slug__c, Summary__c, Published_Date__c 
    FROM Portfolio_Blog__c 
    WHERE Status__c = 'Published' 
    ORDER BY Published_Date__c DESC
  `;

    const result = await conn.query<BlogPost>(query);
    return result.records;
};

// Function to fetch a single blog by Slug
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
    const conn = await getSalesforceConnection();

    const query = `
    SELECT Id, Name, Slug__c, Summary__c, Content__c, Published_Date__c 
    FROM Portfolio_Blog__c 
    WHERE Slug__c = '${slug}' 
    AND Status__c = 'Published' 
    LIMIT 1
  `;

    const result = await conn.query<BlogPost>(query);
    return result.records.length > 0 ? result.records[0] : null;
};

export const getPortfolioUser = async (): Promise<SalesforceUser | null> => {
    const conn = await getSalesforceConnection();

    // We filter by the Username you put in your .env file
    // This ensures we get YOUR profile, not someone else's in the org.
    const query = `
    SELECT Name, Title, AboutMe, FullPhotoUrl, CompanyName 
    FROM User 
    WHERE Username = '${process.env.SF_USERNAME}' 
    LIMIT 1
  `;

    const result = await conn.query<SalesforceUser>(query);
    return result.records.length > 0 ? result.records[0] : null;
};
