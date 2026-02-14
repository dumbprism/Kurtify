const DEFAULT_PRODUCT_IMAGE = "/placeholder.png";

export const PRODUCT_IMAGE_WIDTH = 1560;
export const PRODUCT_IMAGE_HEIGHT = 2080;

function toAbsoluteSaleorUrl(url: string): string {
    if (!url) return DEFAULT_PRODUCT_IMAGE;
    if (/^https?:\/\//i.test(url)) return url;

    const endpoint = process.env.NEXT_PUBLIC_SALEOR_API_URL;
    if (!endpoint) return url;

    try {
        const origin = new URL(endpoint).origin;
        return new URL(url, origin).toString();
    } catch {
        return url;
    }
}

export function getProductImageUrl(node: any): string {
    const sourceUrl = node?.media?.[0]?.url || node?.thumbnail?.url || DEFAULT_PRODUCT_IMAGE;
    return toAbsoluteSaleorUrl(sourceUrl);
}
