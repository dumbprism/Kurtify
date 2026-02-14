
import { saleorClient } from './client';
import { GET_PRODUCTS_QUERY, GET_COLLECTION_QUERY } from './queries';
import { SALEOR_CHANNEL } from './config';

export const getProducts = async (first: number = 10) => {
    return saleorClient.request(GET_PRODUCTS_QUERY, { first, channel: SALEOR_CHANNEL });
};

export const getCollection = async (slug: string, first: number = 10) => {
    return saleorClient.request(GET_COLLECTION_QUERY, { slug, first, channel: SALEOR_CHANNEL });
};
