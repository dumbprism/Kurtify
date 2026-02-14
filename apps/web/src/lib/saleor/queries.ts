
import { gql } from 'graphql-request';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int, $channel: String!, $after: String) {
    products(first: $first, channel: $channel, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          updatedAt
          name
          description
          metadata {
            key
            value
          }
          attributes {
            attribute {
              name
              slug
            }
            values {
              name
              slug
            }
          }
          productType {
            name
          }
          variants {
            attributes {
              attribute {
                name
                slug
              }
              values {
                name
                slug
              }
            }
          }
          collections {
            name
            slug
          }
          media {
            url
            alt
          }
          thumbnail {
            url
            alt
          }
          category {
            name
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_QUERY = gql`
  query GetCollection($slug: String!, $first: Int, $channel: String!) {
    collection(slug: $slug, channel: $channel) {
      id
      name
      products(first: $first) {
        edges {
          node {
            id
            name
            thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($first: Int, $channel: String!) {
    collections(first: $first, channel: $channel) {
      edges {
        node {
          id
          name
          slug
          products(first: 100) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
