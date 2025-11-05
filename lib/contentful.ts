import { createClient } from 'contentful'

// TODO: TEMPORARY WORKAROUND - Remove this and properly configure Contentful environment variables
// This allows the app to run without Contentful credentials configured.
// To fix: Add CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to .env.local
// The functions using these clients already handle errors gracefully (returning empty arrays/null)

const spaceId = process.env.CONTENTFUL_SPACE_ID || 'dummy_space_id'
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || 'dummy_access_token'
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || 'dummy_preview_token'

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
})

export const previewClient = createClient({
  space: spaceId,
  accessToken: previewAccessToken,
  host: 'preview.contentful.com',
})
