async function handleExportToNotion() {
  const pageContent = [
    {
      object: "block",
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "Exported Content Title",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content: "This is the content being exported to Notion.",
            },
          },
        ],
      },
    },
  ];

  try {
    const response = await fetch("/api/exportToNotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: pageContent }),
    });

    if (response.ok) {
      alert("Page successfully exported to Notion!");
    } else {
      console.error("Failed to export content to Notion.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
