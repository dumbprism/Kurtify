import { z } from "zod";
import { publicProcedure, router } from "../index";

// Payload CMS API URL - this will be set via environment variable
const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3002/api";

// Product types matching Payload schema
export interface PayloadProduct {
    id: string;
    name: string;
    slug: string;
    description: unknown; // Rich text content
    shortDescription?: string;
    price: number;
    compareAtPrice?: number;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    images: Array<{
        image: {
            id: string;
            url: string;
            alt?: string;
            sizes?: {
                thumbnail?: { url: string };
                card?: { url: string };
                hero?: { url: string };
            };
        };
        alt?: string;
    }>;
    colors: Array<{
        name: string;
        hexCode: string;
    }>;
    sizes: string[];
    fabric: string;
    care: string;
    rating: number;
    reviewCount: number;
    status: "draft" | "published" | "archived";
    featured: boolean;
    inventory: number;
    createdAt: string;
    updatedAt: string;
}

export interface PayloadCollection {
    id: string;
    name: string;
    slug: string;
    description?: unknown;
    image?: {
        id: string;
        url: string;
        alt?: string;
    };
    heroImage?: {
        id: string;
        url: string;
        alt?: string;
    };
    status: "draft" | "published" | "archived";
    sortOrder: number;
}

// Helper to fetch from Payload API
async function fetchPayload<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${PAYLOAD_API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Payload API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}

export const productsRouter = router({
    // Get all published products
    list: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).optional().default(20),
                page: z.number().min(1).optional().default(1),
                category: z.string().optional(),
                featured: z.boolean().optional(),
                search: z.string().optional(),
            }).optional()
        )
        .query(async ({ input }) => {
            const params = new URLSearchParams();
            params.set("limit", String(input?.limit ?? 20));
            params.set("page", String(input?.page ?? 1));
            params.set("where[status][equals]", "published");
            params.set("depth", "2"); // Include related collections and media

            if (input?.category) {
                params.set("where[category.slug][equals]", input.category);
            }

            if (input?.featured !== undefined) {
                params.set("where[featured][equals]", String(input.featured));
            }

            if (input?.search) {
                params.set("where[name][contains]", input.search);
            }

            const data = await fetchPayload<{
                docs: PayloadProduct[];
                totalDocs: number;
                totalPages: number;
                page: number;
                limit: number;
                hasNextPage: boolean;
                hasPrevPage: boolean;
            }>(`/products?${params.toString()}`);

            return data;
        }),

    // Get a single product by slug
    bySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const params = new URLSearchParams();
            params.set("where[slug][equals]", input.slug);
            params.set("where[status][equals]", "published");
            params.set("depth", "2");
            params.set("limit", "1");

            const data = await fetchPayload<{
                docs: PayloadProduct[];
            }>(`/products?${params.toString()}`);

            if (data.docs.length === 0) {
                throw new Error("Product not found");
            }

            return data.docs[0];
        }),

    // Get featured products for homepage
    featured: publicProcedure
        .input(z.object({ limit: z.number().min(1).max(20).optional().default(4) }).optional())
        .query(async ({ input }) => {
            const params = new URLSearchParams();
            params.set("limit", String(input?.limit ?? 4));
            params.set("where[status][equals]", "published");
            params.set("where[featured][equals]", "true");
            params.set("depth", "2");

            const data = await fetchPayload<{
                docs: PayloadProduct[];
            }>(`/products?${params.toString()}`);

            return data.docs;
        }),
});

export const collectionsRouter = router({
    // Get all published collections
    list: publicProcedure.query(async () => {
        const params = new URLSearchParams();
        params.set("where[status][equals]", "published");
        params.set("sort", "sortOrder");
        params.set("depth", "1");

        const data = await fetchPayload<{
            docs: PayloadCollection[];
        }>(`/collections?${params.toString()}`);

        return data.docs;
    }),

    // Get a single collection by slug
    bySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const params = new URLSearchParams();
            params.set("where[slug][equals]", input.slug);
            params.set("where[status][equals]", "published");
            params.set("depth", "1");
            params.set("limit", "1");

            const data = await fetchPayload<{
                docs: PayloadCollection[];
            }>(`/collections?${params.toString()}`);

            if (data.docs.length === 0) {
                throw new Error("Collection not found");
            }

            return data.docs[0];
        }),
});
