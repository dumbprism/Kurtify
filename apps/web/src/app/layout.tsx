import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Playfair_Display,
	Cormorant_Garamond,
} from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
	variable: "--font-playfair-display",
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal", "italic"],
});

const cormorantGaramond = Cormorant_Garamond({
	variable: "--font-cormorant-garamond",
	subsets: ["latin"],
	weight: ["300", "400"],
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	title: "kurtify",
	description: "kurtify",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} antialiased`}
			>
				<Providers>
					<div className="grid grid-rows-[auto_1fr] h-svh">
						
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
