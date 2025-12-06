import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// Collections
import { Users } from "./collections/Users";
import { Products } from "./collections/Products";
import { Collections as ProductCollections } from "./collections/Collections";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Products, ProductCollections, Media],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "your-super-secret-key-change-in-production",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || "",
        },
        schemaName: "payload",
        // This prefixes all Payload tables
        migrationDir: path.resolve(dirname, "../migrations"),
    }),
    sharp,
});
