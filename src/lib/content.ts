const API_URL = "http://localhost:5174/content";

const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`error status: ${response.status}`);
    }
    const json = await response.json();
    return json.content;
  } catch (error) {
    console.error("Error fetching content", error);
    return "<speak><s>There was an error</s></speak>";
  }
};

const parseContentIntoSentences = (content: string): string[] => {
  const regex = /<s>(.*?)<\/s>/g;
  const matches = [...content.matchAll(regex)];
  return matches.map((match) => match[1].trim());
};

export { fetchContent, parseContentIntoSentences };
