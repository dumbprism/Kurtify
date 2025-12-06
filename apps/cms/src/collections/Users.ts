import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
        description: "CMS administrators who can manage products and collections",
    },
    auth: true,
    access: {
        // Only admins can read the users list
        read: ({ req: { user } }) => {
            if (user?.role === "admin") return true;
            // Users can read their own profile
            return {
                id: {
                    equals: user?.id,
                },
            };
        },
        // Only admins can create new users
        create: ({ req: { user } }) => user?.role === "admin",
        // Only admins can update users (or users updating themselves)
        update: ({ req: { user } }) => {
            if (user?.role === "admin") return true;
            return {
                id: {
                    equals: user?.id,
                },
            };
        },
        // Only admins can delete users
        delete: ({ req: { user } }) => user?.role === "admin",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "role",
            type: "select",
            required: true,
            defaultValue: "editor",
            options: [
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
            ],
            access: {
                // Only admins can change roles
                update: ({ req: { user } }) => user?.role === "admin",
            },
            admin: {
                description: "Admins have full access. Editors can only manage products and collections.",
            },
        },
    ],
};
