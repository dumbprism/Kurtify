import type { auth } from "@kurtify/auth";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL:
		process.env.NEXT_PUBLIC_SERVER_URL ||
		(typeof window !== "undefined" ? window.location.origin : "http://localhost:3001"),
	plugins: [inferAdditionalFields<typeof auth>()],
});
