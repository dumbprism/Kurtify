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

function withVersion(url: string, version: string): string {
    if (!url || !version || url === DEFAULT_PRODUCT_IMAGE) return url;
    try {
        const parsed = new URL(url);
        parsed.searchParams.set("v", version);
        return parsed.toString();
    } catch {
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}v=${encodeURIComponent(version)}`;
    }
}

export function getProductImageUrl(node: any): string {
    const sourceUrl = node?.media?.[0]?.url || node?.thumbnail?.url || DEFAULT_PRODUCT_IMAGE;
    const absolute = toAbsoluteSaleorUrl(sourceUrl);
    const version = node?.updatedAt || node?.id || "";
    return withVersion(absolute, version);
}

export function getColorImageMap(node: any, colors: string[]): Record<string, string> {
    const version = node?.updatedAt || node?.id || "";
    const media = (node?.media || [])
        .filter((m: any) => Boolean(m?.url))
        .map((m: any) => ({
            url: withVersion(toAbsoluteSaleorUrl(m.url), version),
            ref: `${(m?.alt || "").toLowerCase()} ${(m?.url || "").toLowerCase()}`,
        }));

    const map: Record<string, string> = {};
    const namedColors = colors.filter((c) => !/^#[0-9a-fA-F]{6}$/.test(c));

    for (const color of namedColors) {
        const token = color.toLowerCase().trim();
        const matched = media.find((m: any) => m.ref.includes(token));
        if (matched) map[color] = matched.url;
    }

    // Fallback: map by order when explicit matching is unavailable.
    if (namedColors.length > 0 && media.length >= namedColors.length) {
        namedColors.forEach((color, idx) => {
            if (!map[color]) map[color] = media[idx].url;
        });
    }

    return map;
}
