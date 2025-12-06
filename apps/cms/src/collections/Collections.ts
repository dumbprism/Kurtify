import type { CollectionConfig } from "payload";

export const Collections: CollectionConfig = {
    slug: "collections",
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "productCount", "status", "updatedAt"],
        description: "Product collections/categories (e.g., Office Wear, School Wear)",
    },
    access: {
        // Anyone can read published collections
        read: ({ req: { user } }) => {
            if (user) return true;
            return {
                status: {
                    equals: "published",
                },
            };
        },
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
                description: "Collection name (e.g., 'Office Wear')",
            },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                description: "URL-friendly identifier",
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
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
            admin: {
                description: "Collection description for the category page",
            },
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            admin: {
                description: "Featured image for the collection",
            },
        },
        {
            name: "heroImage",
            type: "upload",
            relationTo: "media",
            admin: {
                description: "Large hero image for collection page header",
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
            },
        },
        {
            name: "sortOrder",
            type: "number",
            defaultValue: 0,
            admin: {
                position: "sidebar",
                description: "Order in navigation (lower = first)",
            },
        },
    ],
};
