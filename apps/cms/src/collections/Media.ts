import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    admin: {
        description: "Upload and manage product images",
    },
    access: {
        // Anyone can read media (for displaying images)
        read: () => true,
        // Only authenticated users can upload
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === "admin",
    },
    upload: {
        staticDir: "../public/media",
        mimeTypes: ["image/*"],
        imageSizes: [
            {
                name: "thumbnail",
                width: 150,
                height: 150,
                position: "centre",
            },
            {
                name: "card",
                width: 400,
                height: 533,
                position: "centre",
            },
            {
                name: "hero",
                width: 1200,
                height: 800,
                position: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
            admin: {
                description: "Alt text for accessibility and SEO",
            },
        },
    ],
};
