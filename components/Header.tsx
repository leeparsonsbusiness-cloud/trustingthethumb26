"use client";

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Clock,
  ShieldCheck,
  Trophy,
  PhoneCall,
  Building2
} from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  statusBadgeText?: string;
  currentCity?: string;
}

export default function Header({
  statusBadgeText = "Launching Oct 1: Los Angeles, CA",
  currentCity = "Los Angeles, CA",
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Countdown", href: "/#countdown", icon: Clock },
    { name: "Live Tracker", href: "/#live-tracker", icon: MapPin },
    { name: "The Mission", href: "/#the-mission", icon: Compass },
    { name: "Our Rules", href: "/#our-rules", icon: ShieldCheck },
    { name: "Bucket List", href: "/#bucket-list", icon: Trophy },
    { name: "Hotline", href: "/#hotline", icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-asphalt-deep/90 backdrop-blur-md border-b border-asphalt-border py-3 shadow-xl"
          : "bg-gradient-to-b from-asphalt-darker/90 via-asphalt-darker/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Official Thumbs Up Image */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Trust The Thumb Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-desert to-sunset flex items-center justify-center shadow-amber-glow group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1.5">
              <img
                src="/logo.jpg"
                alt="Trust The Thumb Logo"
                className="w-full h-full object-contain filter invert drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-lg sm:text-xl text-parchment group-hover:text-amber-desert transition-colors leading-none">
                TRUST THE THUMB
              </span>
              <span className="text-[10px] tracking-widest text-parchment-muted uppercase font-mono mt-1">
                2,000 Miles Across America
              </span>
            </div>
          </Link>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 bg-asphalt-card/60 backdrop-blur-sm border border-asphalt-border/60 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-parchment-muted hover:text-parchment hover:bg-asphalt-border/40 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            
            <span className="text-asphalt-border mx-1 font-light">|</span>
            
            <Link
              href="/sponsors"
              className="px-3 py-1.5 text-xs font-bold text-amber-desert hover:text-sunset hover:bg-amber-desert/10 rounded-full transition-all duration-200 flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Sponsors</span>
            </Link>
          </nav>

          {/* Right Action & Live Status Pill */}
          <div className="hidden lg:flex xl:flex items-center gap-4">
            {/* Live Status Pill */}
            <div className="flex items-center gap-2.5 bg-asphalt-card/90 border border-amber-desert/40 px-3.5 py-1.5 rounded-full shadow-amber-glow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-desert opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-desert"></span>
              </span>
              <span className="text-xs font-bold text-amber-desert tracking-wide">
                🟡 {statusBadgeText}
              </span>
            </div>

            {/* Creator Socials Dropdown Pill */}
            <div className="flex items-center gap-2 bg-asphalt-card/40 border border-asphalt-border/50 rounded-full px-3 py-1.5 text-xs text-parchment-muted">
              <span className="text-[11px] font-mono text-parchment/70">Lee:</span>
              <a
                href="https://youtube.com/@theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-desert transition-colors"
                title="Lee Parsons YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-desert transition-colors"
                title="Lee Parsons Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <span className="text-asphalt-border font-light">|</span>

              <span className="text-[11px] font-mono text-parchment/70">Jake:</span>
              <a
                href="https://youtube.com/@Jake_thedrummer26"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-desert transition-colors"
                title="Jake Parsons YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/Jake_thedrummer26"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-desert transition-colors"
                title="Jake Parsons Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 bg-asphalt-card border border-amber-desert/40 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-desert">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-desert opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-desert"></span>
              </span>
              <span>Oct 1 Start</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-asphalt-card border border-asphalt-border text-parchment hover:text-amber-desert focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-asphalt-darker/95 backdrop-blur-xl border-b border-asphalt-border px-4 pt-4 pb-6 mt-3 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-asphalt-card/60 hover:bg-amber-desert/10 hover:text-amber-desert text-parchment text-sm font-semibold border border-asphalt-border/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-amber-desert" />
                  {link.name}
                </a>
              );
            })}

            <Link
              href="/sponsors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-desert/15 text-amber-desert text-sm font-bold border border-amber-desert/40 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Brand Partnerships & Sponsors Page</span>
            </Link>
          </div>

          {/* Mobile Creator Handles */}
          <div className="pt-3 border-t border-asphalt-border/60 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-parchment-muted">
              Follow The Creators
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-asphalt-card p-3 rounded-xl border border-asphalt-border text-xs">
                <div className="font-bold text-parchment">Lee Parsons</div>
                <div className="text-[11px] text-amber-desert font-mono mb-2">@theleeparsons</div>
                <div className="flex gap-2">
                  <a
                    href="https://youtube.com/@theleeparsons"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-asphalt-darker rounded-lg text-parchment-muted hover:text-amber-desert"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/theleeparsons"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-asphalt-darker rounded-lg text-parchment-muted hover:text-amber-desert"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-asphalt-card p-3 rounded-xl border border-asphalt-border text-xs">
                <div className="font-bold text-parchment">Jake Parsons</div>
                <div className="text-[11px] text-amber-desert font-mono mb-2">@Jake_thedrummer26</div>
                <div className="flex gap-2">
                  <a
                    href="https://youtube.com/@Jake_thedrummer26"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-asphalt-darker rounded-lg text-parchment-muted hover:text-amber-desert"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/Jake_thedrummer26"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-asphalt-darker rounded-lg text-parchment-muted hover:text-amber-desert"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
