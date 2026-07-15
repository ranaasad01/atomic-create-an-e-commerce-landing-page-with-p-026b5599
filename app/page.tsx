"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Leaf, Truck, Shield, RefreshCw, Heart, ChevronRight, Sparkles, Check } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, type Product } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Bamboo Hydration Bottle",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviewCount: 312,
    image: "https://heydewy.com/cdn/shop/files/Web_Photoscopy-1.2.jpg?v=1683333320",
    category: "Drinkware",
    badge: "bestseller",
    description: "Double-walled bamboo exterior keeps drinks cold 24 h, hot 12 h. Zero plastic, 100% compostable packaging.",
  },
  {
    id: "2",
    name: "Organic Cotton Tote",
    price: 22.00,
    rating: 4.9,
    reviewCount: 528,
    image: "http://www.ecobags.com/cdn/shop/products/ECOBAGS-ORC-201-c-1457x2000x240ppi-Edit.jpg?v=1670870191",
    category: "Bags",
    badge: "new",
    description: "GOTS-certified organic cotton. Reinforced handles, natural dye, holds up to 20 kg.",
  },
  {
    id: "3",
    name: "Beeswax Wrap Set",
    price: 18.50,
    originalPrice: 24.00,
    rating: 4.7,
    reviewCount: 204,
    image: "http://www.stellaandsol.com/cdn/shop/products/bee-beeswax-wrap-set-of-3-471072.jpg?v=1677199026",
    category: "Kitchen",
    badge: "sale",
    description: "Reusable food wraps made from organic cotton, beeswax, and tree resin. Replaces 1,000 sheets of cling film.",
  },
  {
    id: "4",
    name: "Cork Yoga Mat",
    price: 89.00,
    rating: 4.9,
    reviewCount: 176,
    image: "http://yolohayoga.com/cdn/shop/files/Original-Cork-Yoga-Mat-square.jpg?v=1695912326",
    category: "Wellness",
    badge: "new",
    description: "Naturally antimicrobial cork surface on a recycled rubber base. Non-slip, biodegradable, and beautiful.",
  },
  {
    id: "5",
    name: "Seed Paper Notebook",
    price: 14.99,
    rating: 4.6,
    reviewCount: 389,
    image: "https://www.customearthpromos.com/media/catalog/product/s/e/seed-paper-journals-white-g8.jpeg",
    category: "Stationery",
    description: "100% recycled paper embedded with wildflower seeds. Plant the cover when you're done.",
  },
  {
    id: "6",
    name: "Solar Lantern",
    price: 49.00,
    originalPrice: 62.00,
    rating: 4.8,
    reviewCount: 143,
    image: "https://m.media-amazon.com/images/I/71JNjnevwgL.jpg",
    category: "Outdoor",
    badge: "sale",
    description: "Charges in 6 hours of sunlight, glows for 12 hours. Weatherproof, portable, and plastic-free.",
  },
];

const categories = [
  { name: "Drinkware", icon: "🍃", count: 24, image: "https://m.media-amazon.com/images/I/81UTYLalpyL.jpg" },
  { name: "Kitchen", icon: "🌿", count: 38, image: "https://m.media-amazon.com/images/I/81UTYLalpyL.jpg" },
  { name: "Wellness", icon: "✨", count: 19, image: "https://m.media-amazon.com/images/I/81UTYLalpyL.jpg" },
  { name: "Outdoor", icon: "🌱", count: 31, image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg" },
];

const valueProps = [
  {
    icon: Leaf,
    title: "Certified Organic",
    description: "Every product meets GOTS, FSC, or equivalent certification. We verify so you don't have to.",
  },
  {
    icon: Truck,
    title: "Carbon-Neutral Shipping",
    description: "We offset 100% of delivery emissions through verified reforestation projects.",
  },
  {
    icon: Shield,
    title: "30-Day Guarantee",
    description: "Not satisfied? Return anything within 30 days, no questions asked, free of charge.",
  },
  {
    icon: RefreshCw,
    title: "Circular Returns",
    description: "We repair, resell, or compost returned items. Nothing goes to landfill.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Mara Okonkwo",
    location: "Portland, OR",
    avatar: "https://www.reverselogix.com/wp-content/uploads/panel-1-6.png",
    rating: 5,
    text: "Switched my entire kitchen to Verdant products last year. The beeswax wraps alone have saved me from buying hundreds of plastic bags. Quality is genuinely exceptional.",
  },
  {
    id: "t2",
    name: "James Whitfield",
    location: "Austin, TX",
    avatar: "https://cdn.amazon.science/39/01/1692b22d403799d1d44c5e459a54/james-whitfield.png",
    rating: 5,
    text: "The cork yoga mat is the best I've ever used. Grippy, beautiful, and knowing it's biodegradable makes every practice feel intentional.",
  },
  {
    id: "t3",
    name: "Sofia Reyes",
    location: "Brooklyn, NY",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Sof%C3%ADa_Reyes_2022.jpg",
    rating: 5,
    text: "Fast shipping, gorgeous packaging (all compostable), and the bamboo bottle keeps my coffee hot all morning. I've gifted this to four friends already.",
  },
];

const stats = [
  { value: "2.4M", label: "Plastic items replaced" },
  { value: "180K", label: "Happy customers" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "40K", label: "Trees planted" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function BadgePill({ badge }: { badge: Product["badge"] }) {
  if (!badge) return null;
  const styles: Record<NonNullable<Product["badge"]>, string> = {
    sale: "bg-rose-100 text-rose-700",
    new: "bg-[#ecfdf5] text-[#059669]",
    bestseller: "bg-amber-100 text-amber-700",
  };
  const labels: Record<NonNullable<Product["badge"]>, string> = {
    sale: "Sale",
    new: "New",
    bestseller: "Bestseller",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[badge]}`}>
      {labels[badge]}
    </span>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f0fdf4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Wishlist */}
          <button
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            <Heart
              size={15}
              className={wished ? "fill-rose-500 text-rose-500" : "text-gray-400"}
            />
          </button>
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <BadgePill badge={product.badge} />
            </div>
          )}
          {discount && (
            <div className="absolute bottom-3 left-3">
              <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <span className="text-[11px] font-medium text-[#059669] uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-[#064e3b] text-base leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-black/5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#064e3b]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
            >
              <ShoppingCart size={14} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#f0fdf4] overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, #bbf7d0 0%, transparent 55%), radial-gradient(circle at 20% 80%, #a7f3d0 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-[#059669]/10 text-[#059669] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#059669]/20">
                <Sparkles size={12} />
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#064e3b] tracking-tight leading-[1.05] text-balance"
              style={{ fontFamily: "Rubik, sans-serif" }}
            >
              {t("hero.headline1")}
              <br />
              <span className="text-[#059669]">{t("hero.headline2")}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#064e3b]/70 leading-relaxed max-w-md text-pretty"
            >
              {t("hero.subtext")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <motion.a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-semibold px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(5,150,105,0.35)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-[#064e3b] font-semibold px-6 py-3 rounded-full border border-[#064e3b]/15 hover:border-[#059669] hover:text-[#059669] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              >
                {t("hero.cta_secondary")}
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((label) => (
                <span key={label} className="flex items-center gap-1.5 text-sm text-[#064e3b]/70">
                  <Check size={14} className="text-[#059669]" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(5,150,105,0.18)] border border-white/60">
              <img
                src="https://cdn-lg.accentdecor.com/media/catalog/product/cache/e61374f93f448c557f3598f79d67e665/v/e/verdant.jpg"
                alt="Verdant eco-friendly product collection"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80 flex items-center gap-3"
              >
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-xs font-semibold text-[#064e3b]">{t("hero.float_title")}</p>
                  <p className="text-[11px] text-gray-500">{t("hero.float_sub")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[#059669] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, i) => (
                <motion.div key={stat.label} variants={scaleIn} className="text-center">
                  <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "Rubik, sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#a7f3d0] mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <Reveal>
        <section id="categories" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#059669]">
                  {t("categories.eyebrow")}
                </span>
                <h2 className="mt-2 text-4xl font-extrabold text-[#064e3b] tracking-tight text-balance" style={{ fontFamily: "Rubik, sans-serif" }}>
                  {t("categories.heading")}
                </h2>
              </div>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#059669] hover:text-[#047857] transition-colors"
              >
                {t("categories.view_all")} <ChevronRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <Reveal key={cat.name} delay={i * 0.08}>
                  <motion.a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/80 via-[#064e3b]/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-bold text-lg leading-tight">{cat.name}</p>
                      <p className="text-[#a7f3d0] text-sm">{cat.count} {t("categories.items")}</p>
                    </div>
                    <div className="absolute top-3 right-3 text-2xl">{cat.icon}</div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#059669]">
                {t("products.eyebrow")}
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#064e3b] tracking-tight text-balance" style={{ fontFamily: "Rubik, sans-serif" }}>
                {t("products.heading")}
              </h2>
              <p className="mt-3 text-[#064e3b]/60 max-w-xl mx-auto text-pretty">
                {t("products.subtext")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 0.07} />
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-12">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border-2 border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
              >
                {t("products.view_all")}
                <ArrowRight size={16} />
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <Reveal>
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left image */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(5,150,105,0.12)]">
                  <img
                    src="https://verdant.copeland.com/wp-content/uploads/2025/05/Verdant_VX4_Smart_Thermostat_White.webp"
                    alt="Sustainable living with Verdant products"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
                  className="absolute -bottom-6 -right-6 bg-[#059669] text-white rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(5,150,105,0.35)]"
                >
                  <p className="text-3xl font-extrabold" style={{ fontFamily: "Rubik, sans-serif" }}>40K+</p>
                  <p className="text-[#a7f3d0] text-sm">{t("about.stat_label")}</p>
                </motion.div>
              </motion.div>

              {/* Right content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col gap-8"
              >
                <motion.div variants={fadeInUp}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#059669]">
                    {t("about.eyebrow")}
                  </span>
                  <h2 className="mt-2 text-4xl font-extrabold text-[#064e3b] tracking-tight text-balance" style={{ fontFamily: "Rubik, sans-serif" }}>
                    {t("about.heading")}
                  </h2>
                  <p className="mt-3 text-[#064e3b]/65 leading-relaxed text-pretty">
                    {t("about.body")}
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {valueProps.map((vp, i) => (
                    <motion.div
                      key={vp.title}
                      variants={scaleIn}
                      className="flex gap-3 p-4 rounded-2xl bg-[#f0fdf4] border border-[#a7f3d0]/40"
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#059669]/10 flex items-center justify-center">
                        <vp.icon size={18} className="text-[#059669]" />
                      </span>
                      <div>
                        <p className="font-semibold text-[#064e3b] text-sm">{vp.title}</p>
                        <p className="text-xs text-[#064e3b]/60 leading-relaxed mt-0.5">{vp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#064e3b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6ee7b7]">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-white tracking-tight text-balance" style={{ fontFamily: "Rubik, sans-serif" }}>
                {t("testimonials.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#d1fae5] text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#059669]/40"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-[#6ee7b7] text-xs">{review.location}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <Reveal>
        <section id="newsletter" className="py-24 bg-[#f0fdf4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#059669]">
                {t("newsletter.eyebrow")}
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#064e3b] tracking-tight text-balance" style={{ fontFamily: "Rubik, sans-serif" }}>
                {t("newsletter.heading")}
              </h2>
              <p className="mt-3 text-[#064e3b]/65 leading-relaxed text-pretty">
                {t("newsletter.subtext")}
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-8 inline-flex items-center gap-2 bg-[#059669] text-white font-semibold px-6 py-3 rounded-full"
                >
                  <Check size={18} />
                  {t("newsletter.success")}
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder")}
                    required
                    className="flex-1 px-4 py-3 rounded-full border border-[#a7f3d0] bg-white text-[#064e3b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-sm"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 whitespace-nowrap"
                  >
                    {t("newsletter.cta")}
                  </motion.button>
                </form>
              )}

              <p className="mt-4 text-xs text-[#064e3b]/50">
                {t("newsletter.disclaimer")}
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}