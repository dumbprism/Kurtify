function normalize(value: string | undefined | null): string {
    return (value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function parseNumber(value: string | undefined | null): number | null {
    if (!value) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export function isInCollection(node: any, collectionNameOrSlug: string): boolean {
    const target = normalize(collectionNameOrSlug);
    const collections = node?.collections || [];

    return collections.some((c: any) => {
        const name = normalize(c?.name);
        const slug = normalize(c?.slug);
        return (
            name === target ||
            slug === target ||
            name.includes(target) ||
            slug.includes(target) ||
            target.includes(name) ||
            target.includes(slug)
        );
    });
}

export function getProductRating(node: any): { rating: number; reviews: number } {
    const metadata = node?.metadata || [];
    const map = new Map<string, string>();

    for (const item of metadata) {
        const key = normalize(item?.key);
        if (key && typeof item?.value === "string") {
            map.set(key, item.value);
        }
    }

    const rating =
        parseNumber(map.get("rating")) ??
        parseNumber(map.get("avg_rating")) ??
        parseNumber(map.get("average_rating")) ??
        0;

    const reviews =
        parseNumber(map.get("reviews")) ??
        parseNumber(map.get("review_count")) ??
        parseNumber(map.get("total_reviews")) ??
        0;

    return { rating, reviews };
}

export function getCollectionProductIds(collectionData: any, targetLabel: string): Set<string> {
    const target = normalize(targetLabel);
    const ids = new Set<string>();
    const edges = collectionData?.collections?.edges || [];

    for (const edge of edges) {
        const node = edge?.node;
        const name = normalize(node?.name);
        const slug = normalize(node?.slug);
        const isMatch =
            name === target ||
            slug === target ||
            name.includes(target) ||
            slug.includes(target) ||
            target.includes(name) ||
            target.includes(slug);

        if (!isMatch) continue;

        const productEdges = node?.products?.edges || [];
        for (const pe of productEdges) {
            if (pe?.node?.id) ids.add(pe.node.id);
        }
    }

    return ids;
}
