
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_SALEOR_API_URL || '';

export const saleorClient = new GraphQLClient(endpoint, {
    headers: {
        // Add authorization if needed
        // 'Authorization': `Bearer ${process.env.SALEOR_API_TOKEN}`, 
    },
});
