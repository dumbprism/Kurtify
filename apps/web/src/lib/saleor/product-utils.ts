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

function addUnique(target: string[], value: string) {
    if (!value) return;
    if (!target.includes(value)) target.push(value);
}

function normalizeHex(value: string | undefined | null): string | null {
    const raw = (value || "").trim();
    if (!raw) return null;
    const withHash = raw.startsWith("#") ? raw : `#${raw}`;
    return /^#[0-9a-fA-F]{6}$/.test(withHash) ? withHash.toLowerCase() : null;
}

const COLOR_NAME_TO_HEX: Record<string, string> = {
    black: "#000000",
    white: "#ffffff",
    red: "#ff0000",
    blue: "#0000ff",
    green: "#008000",
    yellow: "#ffff00",
    pink: "#ffc0cb",
    purple: "#800080",
    grey: "#808080",
    gray: "#808080",
    brown: "#8b4513",
    orange: "#ffa500",
    navy: "#000080",
    maroon: "#800000",
    beige: "#f5f5dc",
};

function resolveColorHex(value: any): string | null {
    const fromValue = normalizeHex(value?.value);
    if (fromValue) return fromValue;

    const fromName = normalizeHex(value?.name);
    if (fromName) return fromName;

    const nameKey = normalize(value?.name || value?.slug);
    return COLOR_NAME_TO_HEX[nameKey] || null;
}

function collectAttributeValues(
    selectedAttributes: any[] | undefined,
    colors: string[],
    sizes: string[],
) {
    for (const attr of selectedAttributes || []) {
        const attrKey = normalize(attr?.attribute?.slug || attr?.attribute?.name);
        const values = attr?.values || [];
        const isColor = attrKey.includes("color") || attrKey.includes("colour");
        const isSize = attrKey.includes("size");

        for (const value of values) {
            if (isColor) {
                const hex = resolveColorHex(value);
                if (hex) {
                    addUnique(colors, hex);
                } else {
                    const fallbackColor = value?.name || value?.slug || "";
                    addUnique(colors, fallbackColor);
                }
            }
            const displayValue = value?.name || value?.slug || "";
            if (isSize) addUnique(sizes, displayValue);
        }
    }
}

export function getProductOptions(node: any): { colors: string[]; sizes: string[] } {
    const colors: string[] = [];
    const sizes: string[] = [];

    collectAttributeValues(node?.attributes, colors, sizes);

    const variants = Array.isArray(node?.variants)
        ? node.variants
        : node?.variants?.edges || [];

    for (const variant of variants) {
        const variantNode = variant?.node || variant;
        collectAttributeValues(variantNode?.attributes, colors, sizes);
    }

    return {
        colors: colors.length > 0 ? colors : ["#ffffff"],
        sizes: sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL", "XXL"],
    };
}
