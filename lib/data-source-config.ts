// CENTRAL DATA SOURCE TOGGLE
// Set to 'mock' to use local data, 'contentful' to use Contentful CMS
// Change this ONE variable to switch the entire app between mock and Contentful data

export const DATA_SOURCE: "mock" | "contentful" = "mock";

// Helper to check if using mock data
export const isUsingMockData = () => DATA_SOURCE === "mock";
export const isUsingContentful = () => DATA_SOURCE === "contentful";
