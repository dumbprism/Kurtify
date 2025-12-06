/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootLayout, generateMetadata } from "@payloadcms/next/layouts";
import React from "react";

import "./custom.scss";
import { importMap } from "./admin/importMap";

type Args = {
    children: React.ReactNode;
};

export default async function Layout({ children }: Args) {
    return <RootLayout config={config} importMap={importMap}>{children}</RootLayout>;
}

export { generateMetadata };
