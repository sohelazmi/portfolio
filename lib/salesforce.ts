import { Connection } from "jsforce";

export interface BlogPost {
    Id: string;
    Name: string;
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

let connection: Connection | null = null;

export const getSalesforceConnection = async () => {
    if (connection) return connection;

    const conn = new Connection({
        oauth2: {
            clientId: process.env.SF_CLIENT_ID!,
            clientSecret: process.env.SF_CLIENT_SECRET!,
            loginUrl: process.env.SF_INSTANCE_URL!,
        },
    });

    await conn.authorize({ grant_type: 'client_credentials' });
    
    connection = conn;
    return conn;
};

// Fetch all published blogs
export const getPublishedBlogs = async (): Promise<BlogPost[]> => {
    const conn = await getSalesforceConnection();

    const query = `
    SELECT Id, Name, Slug__c, Summary__c, Published_Date__c 
    FROM Portfolio_Blog__c 
    WHERE Status__c = 'Published' 
    ORDER BY Published_Date__c DESC
  `;

    const result = await conn.query<BlogPost>(query);
    return result.records;
};

// Fetch a single blog by Slug
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

    const identity = await conn.identity();
    
    const query = `
    SELECT Name, Title, AboutMe, FullPhotoUrl, CompanyName 
    FROM User 
    WHERE Id = '${identity.user_id}'
    LIMIT 1
  `;

    const result = await conn.query<SalesforceUser>(query);
    return result.records.length > 0 ? result.records[0] : null;
};
