// // pages/api/exportToNotion.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { Client } from "@notionhq/client";

// // Initialize the Notion client with the integration token
// const notion = new Client({
//   auth: process.env.NOTION_API_KEY, // Store this in your .env.local file
// });

// const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID; // Store your Notion Database ID in .env

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { title, wordMeanings } = req.body;

//     try {
//       // Create a new page in the Notion database
//       const response = await notion.pages.create({
//         parent: {
//           database_id: NOTION_DATABASE_ID!,
//         },
//         properties: {
//           Title: {
//             title: [
//               {
//                 text: {
//                   content: title,
//                 },
//               },
//             ],
//           },
//         },
//         children: wordMeanings.map((wordMeaning: any) => ({
//           object: "block",
//           type: "paragraph",
//           paragraph: {
//             rich_text: [
//               {
//                 text: {
//                   content: `${wordMeaning.word}: ${wordMeaning.meaning}`,
//                 },
//               },
//             ],
//           },
//         })),
//       });

//       res.status(200).json({ success: true, notionPageId: response.id });
//     } catch (error) {
//       console.error("Error exporting to Notion:", error);
//       res.status(500).json({ success: false, error: "Failed to export to Notion" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
