# gatsby-plugin-advanced-sitemap-v5

It's a fork of thi plugin [advanced sitemap plugin](https://github.com/idjem/gatsby-plugin-advanced-sitemap).
The difference it's :

1. you have the traillingslash in the url.
2. you have acces to all data from the query in the function **serializer**

&nbsp;

_NOTE: This plugin only generates output in `production` mode! To test, run: `gatsby build && gatsby serve`_

&nbsp;

## Install

`yarn add --save gatsby-plugin-advanced-sitemap-v5`

## How to Use

By default this plugin will generate a single sitemap of all pages on your site, without any configuration needed.

```javascript
// gatsby-config.js

siteMetadata: {
    siteUrl: `https://www.example.com`,
},
plugins: [
    `gatsby-plugin-advanced-sitemap-v5`
]
```

&nbsp;

## Options

If you want to generate advanced, individually organised sitemaps based on your data, you can do so by passing in a query and config. The example below uses [Ghost](https://ghost.org/), but this should work with any data source - including Pages, Markdown, Contentful, etc.

**Example:**

```javascript
// gatsby-config.js

plugins: [
    {
        resolve: `gatsby-plugin-advanced-sitemap-patch`,
        options: {
             // 1 query for each data type
            query: `
            {
                allGhostPost {
                    edges {
                        node {
                            id
                            slug
                            updated_at
                            feature_image
                        }
                    }
                }
                allGhostPage {
                    edges {
                        node {
                            id
                            slug
                            updated_at
                            feature_image
                        }
                    }
                }
                allGhostTag {
                    edges {
                        node {
                            id
                            slug
                            feature_image
                        }
                    }
                }
                allGhostAuthor {
                    edges {
                        node {
                            id
                            slug
                            profile_image
                        }
                    }
                }
            }`,
            // The filepath and name to Index Sitemap. Defaults to '/sitemap.xml'.
            output: "/custom-sitemap.xml",
            mapping: {
                // Each data type can be mapped to a predefined sitemap
                // Routes can be grouped in one of: posts, tags, authors, pages, or a custom name
                // The default sitemap - if none is passed - will be pages
                allGhostPost: {
                    sitemap: `posts`,
                    // Add a query level prefix to slugs, Don't get confused with global path prefix from Gatsby
                    // This will add a prefix to this particular sitemap only
                    prefix: 'your-prefix/',
                    // Custom Serializer
                    serializer: (edges,dataQuery) => {
                        // you can do something with all data from the query.
                        // For exemple in allSitePages you don't have the date update.
                        return edges.map(({ node }) => {
                            (...) // Custom logic to change final sitemap.
                        })
                    }
                },
                allGhostTag: {
                    sitemap: `tags`,
                },
                allGhostAuthor: {
                    sitemap: `authors`,
                },
                allGhostPage: {
                    sitemap: `pages`,
                },
            },
            exclude: [
                `/dev-404-page`,
                `/404`,
                `/404.html`,
                `/offline-plugin-app-shell-fallback`,
                `/my-excluded-page`,
                /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
            ],
            createLinkInHead: true, // optional: create a link in the `<head>` of your site
            addUncaughtPages: true, // optional: will fill up pages that are not caught by queries and mapping and list them under `sitemap-pages.xml`
            additionalSitemaps: [ // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
                {
                    name: `my-other-posts`,
                    url: `/blog/sitemap-posts.xml`,
                },
                {
                    url: `https://example.com/sitemap.xml`,
                },
            ],
        }
    }
]
```
