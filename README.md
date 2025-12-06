# Headless Salesforce Portfolio

This is a personal portfolio website built with **Next.js 15** that uses **Salesforce** as a Headless CMS.

## 🚀 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend/CMS:** Salesforce Developer Edition (Custom Objects)
- **Integration:** JSForce (Salesforce REST API)

## ⚙️ How it works
1. Blog posts are written and stored in a custom Salesforce Object (`Portfolio_Blog__c`).
2. The Next.js application connects to Salesforce via OAuth.
3. Content is fetched at build time (or request time) and rendered as static HTML.

## 🛠️ Setup
1. Clone the repo.
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Salesforce credentials:
   ```bash
   SF_LOGIN_URL=https://login.salesforce.com
   SF_USERNAME=your-email
   SF_PASSWORD=your-password
   SF_TOKEN=your-security-token
