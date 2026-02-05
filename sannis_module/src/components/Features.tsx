import { motion } from "framer-motion";
import { Container } from "./ui/Container";

const features = [
    {
        title: "Copy Trading",
        description: "Copy a wallet’s buys and sells with precision and endless customizable options.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M6.5625 6V6.5625M6.5625 3.75V2.0625H8.25M14.25 2.0625H15.9375V3.75M10.5 2.0625H12M15.9375 6V7.5M15.9375 9.75V11.4375H14.25M12 11.4375H11.4375M11.4375 6.5625H2.0625V15.9375H11.4375V6.5625Z" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Token Audits",
        description: "Instant insights to contract functions, sniped and bundled percentages, top holders and more.",
        icon: (
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M7.60413 8.625L8.91663 9.9375L11.7291 7.125M9.66663 2.0625L15.8541 4.125V8.93423C15.8541 12.6636 12.6666 14.4375 9.66663 16.0559C6.66663 14.4375 3.47913 12.6636 3.47913 8.93423V4.125L9.66663 2.0625Z" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Real-Time Alerts",
        description: "The most important notifications you need in-app, from tracked wallet trades to migration alerts.",
        icon: (
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" d="M15.5208 12.9375H3.14575V12L4.30591 9.75L4.46088 6.68173C4.5907 4.09411 6.73365 2.0625 9.33325 2.0625C11.9328 2.0625 14.0758 4.09411 14.2056 6.68173L14.3606 9.75L15.5208 12V12.9375Z" strokeWidth="1.5" />
                <path strokeLinejoin="miter" stroke="currentColor" d="M6.34814 13.2384C6.49907 14.754 7.77794 15.9375 9.33322 15.9375C10.8886 15.9375 12.1674 14.754 12.3184 13.2384" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Most Complete Data",
        description: "Access years of onchain history. Every buy, sell, mint, burn, and more, on even the oldest tokens.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M9 5.8125V9L11.625 11.625" strokeWidth="1.5" />
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M2.0625 3.5625V6.5625H5.0625" strokeWidth="1.5" />
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M2.4375 11.3125C3.39127 14.007 5.96477 15.9375 8.9898 15.9375C12.8269 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16853 12.8269 2.0625 8.9898 2.0625C6.11106 2.0625 3.64123 3.81079 2.5871 6.30208" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "24/7 Support",
        description: "Live support whenever you need it. Our support team is standing by to answer your questions.",
        icon: (
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M4.22913 7.3125V7.125C4.22913 4.32906 6.66358 2.0625 9.66663 2.0625C12.6697 2.0625 15.1041 4.32906 15.1041 7.125V7.3125M9.66663 14.7322V15.9375H11.9166C13.7806 15.9375 15.2916 14.4265 15.2916 12.5625M3.85413 7.3125H4.97913V12.1875H3.85413C3.2328 12.1875 2.72913 11.6838 2.72913 11.0625V8.4375C2.72913 7.8162 3.2328 7.3125 3.85413 7.3125ZM14.3541 7.3125H15.4791C16.1004 7.3125 16.6041 7.8162 16.6041 8.4375V11.0625C16.6041 11.6838 16.1004 12.1875 15.4791 12.1875H14.3541V7.3125Z" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Watchlists",
        description: "Quickly create, label, and organize lists of tickers to keep track of potential gems.",
        icon: (
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_9795_13779)">
                    <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M2.77075 9C5.95825 7.875 8.20825 5.625 9.33325 2.4375C10.4583 5.625 12.7083 7.875 15.8958 9C12.7083 10.125 10.4583 12.375 9.33325 15.5625C8.20825 12.375 5.95825 10.125 2.77075 9Z" strokeWidth="1.5" />
                </g>
                <defs>
                    <clipPath id="clip0_9795_13779">
                        <rect width="18" height="18" fill="white" transform="translate(0.333252)" />
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        title: "Perpetuals",
        description: "Trade perpetuals directly onchain with speed, precision, and zero compromise.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" strokeLinecap="square" d="M5.25 2.0625V8.0625M5.25 8.0625H2.8125V13.6875H5.25M5.25 8.0625H7.6875V13.6875H5.25M5.25 13.6875V15.9375M12.75 2.06251V4.3125M12.75 4.3125H10.3125V13.6875H12.75M12.75 4.3125H15.1875V13.6875H12.75M12.75 13.6875V15.9375" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "Custom PNL Cards",
        description: "Flex your holdings with a collection of curated Trojan originals, or use your own. You choose.",
        icon: (
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="miter" stroke="currentColor" d="M8.78275 15.3723L16.2336 9.67462L8.80893 2.25L3.11127 9.7008C2.42625 10.5966 2.51018 11.8612 3.30759 12.6586L5.82501 15.176C6.62242 15.9734 7.88697 16.0574 8.78275 15.3723Z" strokeWidth="1.5" />
                <path strokeLinejoin="miter" stroke="currentColor" d="M10.0416 8.625L2.16663 4.5" strokeWidth="1.5" />
                <path strokeLinejoin="miter" stroke="currentColor" d="M17.5416 14.7C17.5416 15.6941 16.7861 16.5 15.8541 16.5C14.9222 16.5 14.1666 15.6941 14.1666 14.7C14.1666 13.35 15.8541 12 15.8541 12C15.8541 12 17.5416 13.35 17.5416 14.7Z" fill="#AEB3BA" />
            </svg>
        ),
    },
    {
        title: "And much more...",
        description: "All the tools you need to conquer onchain, and everything else to stay ahead.",
        icon: null,
    },
];

export function Features() {
    return (
        <section className="py-24 relative z-10 bg-[#050505]">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Everything you need to<br className="hidden md:block" /> escape the trenches.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#0D1015] border border-[#rgba(142, 148, 157, 0.05)] rounded-[12px] p-6 flex flex-col items-start hover:border-white/10 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {feature.icon && (
                                    <div className="text-[#AEB3BA]">
                                        {feature.icon}
                                    </div>
                                )}
                                <h3 className="text-[16px] font-medium text-[#C9CCD1] tracking-tight">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-[14px] font-medium text-[#8E949D] leading-[1.6em]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

