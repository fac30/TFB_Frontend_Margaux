export async function parseDoc(doc: string): Promise<string> {
    try {
        const docUrl = `${doc}`; 
        const response = await fetch(docUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch document: ${response.status}`);
        }
        
        const htmlText = await response.text();
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(htmlText, "text/html");
  
        const contentElement = parsedDoc.querySelector(".doc-content");
        
        if (!contentElement) {
            return "";
        }
        
        // Get all text nodes and preserve line breaks
        const textContent = Array.from(contentElement.childNodes)
            .map(node => node.textContent?.trim())
            .filter(Boolean)
            .join('\n\n');
        
        return textContent;
        
    } catch (error) {
        console.error("Error parsing document:", error);
        throw error;
    }
}