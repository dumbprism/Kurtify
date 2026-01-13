"use client";
import {
    ShoppingBag,
    Heart,
    User,
    Search,
    ArrowLeft,
    Menu,
    X,
    Sparkles,
    Target,
    Eye,
    Lightbulb,
    Gem,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, isVisible };
}

// Animated section component
function AnimatedSection({
    children,
    className = "",
    animation = "fade-up",
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-up";
    delay?: number;
}) {
    const { ref, isVisible } = useScrollAnimation();

    const getAnimationClasses = () => {
        const baseClasses = "transition-all duration-1000 ease-out";

        if (!isVisible) {
            switch (animation) {
                case "fade-up":
                    return `${baseClasses} opacity-0 translate-y-12`;
                case "fade-left":
                    return `${baseClasses} opacity-0 -translate-x-12`;
                case "fade-right":
                    return `${baseClasses} opacity-0 translate-x-12`;
                case "fade-in":
                    return `${baseClasses} opacity-0`;
                case "scale-up":
                    return `${baseClasses} opacity-0 scale-95`;
                default:
                    return `${baseClasses} opacity-0 translate-y-12`;
            }
        }
        return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    };

    return (
        <div
            ref={ref}
            className={`${getAnimationClasses()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function AboutPage() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const values = [
        {
            icon: Gem,
            title: "Quality Craftsmanship",
            description:
                "Every stitch tells a story of dedication, precision, and centuries-old artisanal techniques passed down through generations.",
        },
        {
            icon: Sparkles,
            title: "Timeless Elegance",
            description:
                "We blend traditional Indian aesthetics with contemporary silhouettes to create pieces that transcend fleeting trends.",
        },
        {
            icon: Heart,
            title: "Customer Love",
            description:
                "Your satisfaction is our north star. We're committed to creating experiences that make you feel valued and beautiful.",
        },
    ];

    // Reliable working image URLs from Pexels (no API key needed)
    const images = {
        hero: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
        about: "https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
        motivation: "https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
        vision: "https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    };

    return (
        <>
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap");

                .font-serif-elegant {
                    font-family: "Playfair Display", serif;
                }

                .font-cursive {
                    font-family: "Cormorant Garamond", serif;
                }

                @keyframes heroFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-hero {
                    animation: heroFadeIn 1s ease-out 0.3s forwards;
                    opacity: 0;
                }
            `}</style>

            <div className="min-h-screen bg-black text-white">
                {/* Floating Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`fixed top-6 right-6 z-50 transition-all duration-500 ${scrolled
                        ? "w-14 h-14 rounded-full bg-white text-black shadow-xl"
                        : "w-auto h-auto bg-transparent text-white"
                        }`}
                >
                    {scrolled ? (
                        <div className="flex items-center justify-center">
                            {menuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6 px-6">
                            <Search className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                            <Heart className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                            <User className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300 hidden md:block" />
                            <Menu
                                className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300"
                                onClick={() => setMenuOpen(true)}
                            />
                        </div>
                    )}
                </button>

                {/* Side Menu */}
                <div
                    className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-black border-l border-white/10 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-12 h-full flex flex-col">
                            <div className="mb-16">
                                <h2 className="text-5xl font-cursive italic mb-2">Kurtify</h2>
                                <p className="text-sm text-white/40 tracking-widest uppercase">
                                    Menu
                                </p>
                            </div>

                            <nav className="flex-1 flex flex-col space-y-8">
                                <Link
                                    href="/"
                                    className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/collection"
                                    className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4"
                                >
                                    Collections
                                </Link>
                                <Link
                                    href="/collection"
                                    className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4"
                                >
                                    New Arrivals
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4"
                                >
                                    About
                                </Link>
                            </nav>

                            <div className="mt-auto">
                                <div className="flex space-x-4 mb-8">
                                    <Search className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                                    <Heart className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                                    <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                                    <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                                </div>
                                <p className="text-xs text-white/30 tracking-widest uppercase">
                                    © 2024 Kurtify
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logo - Fixed Top Left */}
                <div className="fixed top-6 left-6 z-50">
                    <Link href="/">
                        <h1 className="text-4xl font-cursive italic tracking-wide cursor-pointer hover:text-gray-300 transition-colors">
                            Kurtify
                        </h1>
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black opacity-70 z-10"></div>
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("${images.hero}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "grayscale(30%) contrast(1.1)",
                        }}
                    ></div>

                    <div className="relative z-20 text-center max-w-4xl px-6 animate-hero">
                        <p className="text-sm tracking-widest uppercase text-white/60 mb-6">
                            Our Story
                        </p>
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-elegant mb-6 tracking-tight leading-none">
                            About Kurtify
                        </h2>
                        <p className="text-xl md:text-2xl font-cursive italic text-white/80 tracking-wide">
                            Crafting elegance, celebrating heritage
                        </p>
                    </div>

                    {/* Back Button */}
                    {/* <button
                        onClick={() => router.back()}
                        className="absolute bottom-12 left-6 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs tracking-widest uppercase">Back</span>
                    </button> */}
                </section>

                {/* About Kurtify Section */}
                <section className="py-32 px-6 lg:px-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection animation="fade-left">
                            <p className="text-sm tracking-widest uppercase text-white/40 mb-4">
                                Who We Are
                            </p>
                            <h3 className="text-4xl md:text-5xl font-serif-elegant tracking-tight mb-8 text-white">
                                Redefining Indian Fashion
                            </h3>
                            <div className="space-y-6 text-white/70 font-light leading-relaxed">
                                <p>
                                    Kurtify was born from a deep appreciation for the timeless
                                    beauty of Indian textiles and a vision to make traditional
                                    elegance accessible to the modern woman. We believe that every
                                    woman deserves to feel both comfortable and confident in what
                                    she wears.
                                </p>
                                <p>
                                    Our journey began in the vibrant lanes of Bengaluru, where
                                    centuries-old weaving techniques meet contemporary design
                                    sensibilities. Today, we curate a collection that honors our
                                    rich heritage while embracing the dynamic lifestyles of women
                                    everywhere.
                                </p>
                                <p>
                                    From the boardroom to the classroom, from casual brunches to
                                    festive celebrations — Kurtify is your companion for every
                                    moment that matters.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fade-right" delay={200} className="relative">
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={images.about}
                                    alt="Kurtify craftsmanship"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </AnimatedSection>
                    </div>
                </section>

                {/* Motivation Section */}
                <section className="py-32 bg-white text-black">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection animation="fade-right" className="order-2 lg:order-1 relative">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={images.motivation}
                                        alt="Kurtify motivation"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                            </AnimatedSection>
                            <AnimatedSection animation="fade-left" delay={200} className="order-1 lg:order-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <Lightbulb className="w-8 h-8 text-black/60" />
                                    <p className="text-sm tracking-widest uppercase text-black/40">
                                        Our Motivation
                                    </p>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-serif-elegant tracking-tight mb-8">
                                    Inspired by You
                                </h3>
                                <div className="space-y-6 text-black/70 font-light leading-relaxed">
                                    <p>
                                        We are driven by the belief that fashion should empower, not
                                        intimidate. Every woman is unique, and her wardrobe should
                                        reflect her individuality, her aspirations, and her journey.
                                    </p>
                                    <p>
                                        The modern Indian woman is multifaceted — she balances
                                        tradition with ambition, grace with strength. She deserves
                                        clothing that moves with her, supports her, and makes her
                                        feel unstoppable.
                                    </p>
                                    <p>
                                        This understanding fuels everything we do at Kurtify. From
                                        selecting the finest fabrics to designing silhouettes that
                                        flatter every body type, we pour our heart into creating
                                        pieces that you'll cherish.
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-black to-gray-900">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection animation="fade-up">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 border border-white/30 flex items-center justify-center">
                                    <Target className="w-8 h-8 text-white/80" />
                                </div>
                            </div>
                            <p className="text-sm tracking-widest uppercase text-white/40 mb-4">
                                Our Mission
                            </p>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif-elegant tracking-tight mb-8">
                                Elegance for Every Woman
                            </h3>
                            <div className="w-24 h-px bg-white/30 mx-auto mb-8"></div>
                            <p className="text-xl md:text-2xl font-cursive italic text-white/70 leading-relaxed max-w-3xl mx-auto">
                                "To democratize elegance by creating beautiful, high-quality
                                kurtis that celebrate Indian craftsmanship while remaining
                                accessible, comfortable, and perfect for the rhythm of everyday
                                life."
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {values.map((value, index) => (
                                <AnimatedSection
                                    key={index}
                                    animation="fade-up"
                                    delay={index * 150}
                                >
                                    <div className="p-8 border border-white/10 hover:border-white/30 transition-colors duration-500 group h-full">
                                        <value.icon className="w-8 h-8 mb-6 text-white/60 group-hover:text-white transition-colors duration-300" />
                                        <h4 className="text-xl font-serif-elegant mb-4">
                                            {value.title}
                                        </h4>
                                        <p className="text-sm text-white/50 font-light leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("${images.vision}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "grayscale(100%)",
                            }}
                        ></div>
                    </div>
                    <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                        <AnimatedSection animation="scale-up">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 border border-white flex items-center justify-center">
                                    <Eye className="w-8 h-8 text-white/80" />
                                </div>
                            </div>
                            <p className="text-sm tracking-widest uppercase text-white mb-4">
                                Our Vision
                            </p>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif-elegant tracking-tight mb-8 text-white">
                                Shaping Tomorrow's Fashion
                            </h3>
                            <div className="w-24 h-px bg-white/30 mx-auto mb-8"></div>
                            <p className="text-xl md:text-2xl font-cursive italic text-white leading-relaxed max-w-3xl mx-auto mb-12">
                                "To become the most beloved destination for Indian ethnic wear,
                                recognized globally for our commitment to quality, sustainability,
                                and the preservation of traditional textile arts."
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                            <AnimatedSection animation="fade-left" delay={200}>
                                <div className="text-left p-6 border-l border-white/30">
                                    <h5 className="text-lg font-serif-elegant mb-2">
                                        Global Reach
                                    </h5>
                                    <p className="text-sm text-white/50 font-light">
                                        Bringing Indian elegance to women worldwide, celebrating our
                                        rich heritage on the global stage.
                                    </p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animation="fade-right" delay={300}>
                                <div className="text-left p-6 border-l border-white/30">
                                    <h5 className="text-lg font-serif-elegant mb-2">
                                        Sustainable Future
                                    </h5>
                                    <p className="text-sm text-white/50 font-light">
                                        Committed to eco-friendly practices and supporting artisan
                                        communities for generations to come.
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-6 bg-black text-white">
                    <AnimatedSection animation="fade-up" className="max-w-2xl mx-auto text-center">
                        <h3 className="text-4xl md:text-5xl font-serif-elegant mb-6">
                            Begin Your Journey
                        </h3>
                        <p className="font-cursive italic text-xl text-white/60 mb-12">
                            Discover pieces that tell your story
                        </p>
                        <Link
                            href="/collection"
                            className="inline-flex items-center gap-3 bg-white text-black px-12 py-4 uppercase tracking-widest text-sm font-light hover:bg-white/80 hover:text-black transition-colors duration-300 group "
                        >
                            Explore Collection
                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </AnimatedSection>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 py-16 px-6 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fade-up">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                                <div>
                                    <h4 className="text-3xl font-cursive italic mb-4">Kurtify</h4>
                                    <p className="text-sm text-white/40 font-light leading-relaxed">
                                        Redefining elegance, one kurti at a time.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">
                                        Shop
                                    </h5>
                                    <ul className="space-y-3 text-sm text-white/40 font-light">
                                        <li>
                                            <Link
                                                href="/collection"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                New Arrivals
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/collection"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                Collections
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/collection"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                Sale
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">
                                        Company
                                    </h5>
                                    <ul className="space-y-3 text-sm text-white/40 font-light">
                                        <li>
                                            <Link
                                                href="/about"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="hover:text-white transition-colors duration-300"
                                            >
                                                Careers
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">
                                        Follow
                                    </h5>
                                    <div className="flex space-x-4">
                                        <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                                            IN
                                        </div>
                                        <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                                            FB
                                        </div>
                                        <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                                            IG
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
                                <p>© 2024 Kurtify. All Rights Reserved.</p>
                                <p className="mt-4 md:mt-0">Made with ♥ in India</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </footer>
            </div>
        </>
    );
}
