import { saleorClient } from "./client";
import { GET_PRODUCTS_QUERY } from "./queries";

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

export async function fetchAllProducts(channel: string) {
    const edges: any[] = [];
    let after: string | null = null;

    for (let page = 0; page < MAX_PAGES; page++) {
        const data: any = await saleorClient.request(GET_PRODUCTS_QUERY, {
            first: PAGE_SIZE,
            channel,
            after,
        });

        const connection = data?.products;
        const pageEdges = connection?.edges || [];
        edges.push(...pageEdges);

        const hasNextPage = Boolean(connection?.pageInfo?.hasNextPage);
        const endCursor = connection?.pageInfo?.endCursor;

        if (!hasNextPage || !endCursor) break;
        after = endCursor;
    }

    return { products: { edges } };
}
