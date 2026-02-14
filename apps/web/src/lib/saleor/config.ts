function normalizeChannel(input: string | undefined): string {
    const raw = (input || "inr").trim().toLowerCase();
    // Accept common forms like "Channel-INR" and normalize to slug "inr".
    if (raw.startsWith("channel-")) return raw.replace(/^channel-/, "");
    return raw;
}

export const SALEOR_CHANNEL = normalizeChannel(process.env.NEXT_PUBLIC_SALEOR_CHANNEL);
