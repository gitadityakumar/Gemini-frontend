import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function POST(request: NextRequest) {
  const { content, title } = await request.json();
  const notionToken = request.cookies.get('notion_token')?.value;

  if (!notionToken) {
    return NextResponse.json({ error: 'Not authenticated with Notion' }, { status: 401 });
  }

  const notion = new Client({ auth: notionToken });

  try {
    // Search for pages that the user has access to
    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    });

    // Find the first page that doesn't have a parent (i.e., it's a root page)
    const rootPage = response.results.find((page: any) => !page.parent.page_id);

    if (!rootPage) {
      return NextResponse.json({ error: 'No root page found in the workspace' }, { status: 404 });
    }

    // Create the new page under the root page
    const newPage = await notion.pages.create({
      parent: { page_id: rootPage.id },
      properties: {
        title: {
          type: 'title',
          title: [{ type: 'text', text: { content: title || 'Exported Content' } }]
        }
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content } }]
          }
        }
      ]
    });

    return NextResponse.json({ message: 'Content exported to Notion successfully', pageId: newPage.id });
  } catch (error) {
    console.error('Error exporting to Notion:', error);
    return NextResponse.json({ error: 'Failed to export content to Notion' }, { status: 500 });
  }
}