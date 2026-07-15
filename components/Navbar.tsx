"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { navLinks, APP_NAME, NAV_CTA } from "@/lib/data";
import { useTranslations } from "next-intl";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border-b border-[#a7f3d0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-lg"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#059669] text-white group-hover:scale-110 transition-transform duration-200">
              <Leaf size={16} strokeWidth={2.5} />
            </span>
            <span
              className="font-bold text-xl tracking-tight text-[#064e3b]"
              style={{ fontFamily: "Rubik, sans-serif" }}
            >
              {t("nav.brand")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-[#064e3b]/80 hover:text-[#059669] rounded-lg hover:bg-[#ecfdf5] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              >
                {t(`nav.${link.label.toLowerCase()}`)}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="#products"
              onClick={(e) => handleAnchorClick(e, "#products")}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ecfdf5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              aria-label={t("nav.cart")}
            >
              <ShoppingCart size={20} className="text-[#064e3b]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#ea580c] text-white text-[10px] font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href={resolveHref(NAV_CTA.href)}
              onClick={(e) => handleAnchorClick(e, NAV_CTA.href)}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] transition-all duration-200 shadow-[0_2px_8px_rgba(5,150,105,0.35)] hover:shadow-[0_4px_16px_rgba(5,150,105,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
            >
              {t("nav.cta")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ecfdf5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              aria-label={t("nav.toggleMenu")}
            >
              {mobileOpen ? (
                <X size={20} className="text-[#064e3b]" />
              ) : (
                <Menu size={20} className="text-[#064e3b]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white/98 backdrop-blur-md border-t border-[#a7f3d0]"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-3 text-sm font-medium text-[#064e3b] hover:text-[#059669] hover:bg-[#ecfdf5] rounded-xl transition-all duration-200"
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                </Link>
              ))}
              <Link
                href={resolveHref(NAV_CTA.href)}
                onClick={(e) => handleAnchorClick(e, NAV_CTA.href)}
                className="mt-2 px-4 py-3 rounded-xl bg-[#059669] text-white text-sm font-semibold text-center hover:bg-[#047857] transition-colors duration-200"
              >
                {t("nav.cta")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}