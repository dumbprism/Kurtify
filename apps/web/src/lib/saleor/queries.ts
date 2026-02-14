
import { gql } from 'graphql-request';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int, $channel: String!) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          id
          name
          description
          metadata {
            key
            value
          }
          productType {
            name
          }
          collections {
            name
            slug
          }
          media {
            url
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
          products(first: 200) {
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
