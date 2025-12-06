import { protectedProcedure, publicProcedure, router } from "../index";
import { productsRouter, collectionsRouter } from "./products";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	// Products from Payload CMS
	products: productsRouter,
	collections: collectionsRouter,
});
export type AppRouter = typeof appRouter;
