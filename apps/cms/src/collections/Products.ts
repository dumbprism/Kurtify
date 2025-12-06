import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "category", "price", "status", "updatedAt"],
        description: "Manage your product catalog",
    },
    access: {
        // Anyone can read published products
        read: ({ req: { user } }) => {
            // If user is an admin or editor, they can see all products
            if (user) return true;
            // Public users can only see published products
            return {
                status: {
                    equals: "published",
                },
            };
        },
        // Only authenticated CMS users can create/update/delete
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === "admin",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            admin: {
                description: "The product name displayed to customers",
            },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                description: "URL-friendly identifier (e.g., 'professional-elegance')",
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        // Auto-generate slug from name if not provided
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: "description",
            type: "richText",
            required: true,
            admin: {
                description: "Detailed product description",
            },
        },
        {
            name: "shortDescription",
            type: "textarea",
            admin: {
                description: "Brief description for product cards (max 200 chars)",
            },
            maxLength: 200,
        },
        {
            name: "price",
            type: "number",
            required: true,
            min: 0,
            admin: {
                description: "Price in INR (without commas)",
            },
        },
        {
            name: "compareAtPrice",
            type: "number",
            min: 0,
            admin: {
                description: "Original price for showing discounts (optional)",
            },
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "collections",
            required: true,
            admin: {
                description: "Which collection does this product belong to?",
            },
        },
        {
            name: "images",
            type: "array",
            required: true,
            minRows: 1,
            admin: {
                description: "Product images (first image is the main image)",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "alt",
                    type: "text",
                    admin: {
                        description: "Alt text for accessibility",
                    },
                },
            ],
        },
        {
            name: "colors",
            type: "array",
            required: true,
            minRows: 1,
            admin: {
                description: "Available color options",
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Color name (e.g., 'Midnight Black')",
                    },
                },
                {
                    name: "hexCode",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Hex color code (e.g., '#1a1a1a')",
                    },
                },
            ],
        },
        {
            name: "sizes",
            type: "select",
            hasMany: true,
            required: true,
            options: [
                { label: "XS", value: "XS" },
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
                { label: "XL", value: "XL" },
                { label: "XXL", value: "XXL" },
            ],
            admin: {
                description: "Available sizes",
            },
        },
        {
            name: "fabric",
            type: "text",
            required: true,
            admin: {
                description: "Fabric composition (e.g., 'Premium Cotton Blend')",
            },
        },
        {
            name: "care",
            type: "text",
            required: true,
            admin: {
                description: "Care instructions (e.g., 'Machine wash cold')",
            },
        },
        {
            name: "rating",
            type: "number",
            min: 0,
            max: 5,
            defaultValue: 0,
            admin: {
                description: "Average customer rating (0-5)",
            },
        },
        {
            name: "reviewCount",
            type: "number",
            min: 0,
            defaultValue: 0,
            admin: {
                description: "Number of customer reviews",
            },
        },
        {
            name: "status",
            type: "select",
            required: true,
            defaultValue: "draft",
            options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
            ],
            admin: {
                position: "sidebar",
                description: "Only published products are visible to customers",
            },
        },
        {
            name: "featured",
            type: "checkbox",
            defaultValue: false,
            admin: {
                position: "sidebar",
                description: "Show on homepage featured section",
            },
        },
        {
            name: "inventory",
            type: "number",
            min: 0,
            defaultValue: 0,
            admin: {
                position: "sidebar",
                description: "Stock quantity",
            },
        },
    ],
};
