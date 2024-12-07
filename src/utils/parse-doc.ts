export async function parseDoc(doc: string): Promise<string> {
    try {
        // Replace this with your publicly accessible Google Docs URL
        const docUrl = `${doc}`; // Example
  
        // Fetch the document's public HTML view
        const response = await fetch(docUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch document: ${response.status}`);
        }
        
        const htmlText = await response.text();
  
        // Parse the HTML content
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(htmlText, "text/html");
  
        // Extract text from the relevant section
        const contentElement = parsedDoc.querySelector(".doc-content"); // Adjust selector as needed
        return contentElement?.textContent || "";
        
    } catch (error) {
        console.error("Error parsing document:", error);
        throw error;
    }
}