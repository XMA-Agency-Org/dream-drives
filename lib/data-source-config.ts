// CENTRAL DATA SOURCE TOGGLE
// Set to 'mock' to use local data, 'contentful' to use Contentful CMS
// Change this ONE variable to switch the entire app between mock and Contentful data

const DATA_SOURCE_VALUE = "contentful" as const;
export const DATA_SOURCE: "mock" | "contentful" = DATA_SOURCE_VALUE;

// Helper to check if using mock data
export const isUsingMockData = (): boolean => {
  return (DATA_SOURCE as string) === "mock";
};
export const isUsingContentful = (): boolean => {
  return (DATA_SOURCE as string) === "contentful";
};
