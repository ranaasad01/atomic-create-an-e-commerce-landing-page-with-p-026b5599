"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Mail, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Heart } from 'lucide-react';
import { APP_NAME } from "@/lib/data";
import { useTranslations } from "next-intl";

const footerSections = [
  {
    titleKey: "footer.shop.title",
    links: [
      { labelKey: "footer.shop.all", href: "#products" },
      { labelKey: "footer.shop.new", href: "#products" },
      { labelKey: "footer.shop.sale", href: "#products" },
      { labelKey: "footer.shop.bestsellers", href: "#products" },
    ],
  },
  {
    titleKey: "footer.company.title",
    links: [
      { labelKey: "footer.company.about", href: "#about" },
      { labelKey: "footer.company.sustainability", href: "#about" },
      { labelKey: "footer.company.press", href: "#about" },
      { labelKey: "footer.company.careers", href: "#about" },
    ],
  },
  {
    titleKey: "footer.support.title",
    links: [
      { labelKey: "footer.support.faq", href: "#newsletter" },
      { labelKey: "footer.support.shipping", href: "#newsletter" },
      { labelKey: "footer.support.returns", href: "#newsletter" },
      { labelKey: "footer.support.contact", href: "#newsletter" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-[#064e3b] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-lg"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#10b981] text-white group-hover:scale-110 transition-transform duration-200">
                <Leaf size={18} strokeWidth={2.5} />
              </span>
              <span
                className="font-bold text-2xl tracking-tight text-white"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                {APP_NAME}
              </span>
            </Link>
            <p className="text-[#a7f3d0] text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.brand.description")}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#10b981] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4
                className="font-semibold text-sm uppercase tracking-wider text-[#10b981] mb-4"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={resolveHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-[#a7f3d0] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#a7f3d0]">
            {t("footer.copyright", { year: 2025, brand: APP_NAME })}
          </p>
          <p className="text-xs text-[#a7f3d0] flex items-center gap-1">
            {t("footer.madeWith")}
            <Heart size={12} className="text-[#ea580c] fill-[#ea580c]" />
            {t("footer.forNature")}
          </p>
        </div>
      </div>
    </footer>
  );
}