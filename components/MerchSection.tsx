"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Check, 
  Truck, 
  ShieldCheck, 
  X, 
  Eye,
  ArrowRight,
  Flame
} from "lucide-react";

interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  type: "shirt" | "hoodie";
  price: string;
  badge: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

const PRODUCTS: Product[] = [
  {
    id: "tee-cardboard",
    name: '"Not Sure Where I\'m Heading" Heavyweight Tee',
    subtitle: "Original Cardboard Road Sign Edition",
    type: "shirt",
    price: "$29.99",
    badge: "Iconic Road Sign",
    description: "Features Jake's original handwritten cardboard hitchhiker sign: 'NOT SURE WHERE I'M HEADING BUT I'LL GET THERE'. Built with heavy vintage wash cotton and durable stitching for highway shifts.",
    features: [
      "Heavyweight 240 GSM Combed Cotton",
      "Vintage garment-dyed wash",
      "Durable high-density screenprint",
      "Boxy drop-shoulder relaxed cut"
    ],
    variants: [
      {
        colorName: "Off-White Cream",
        colorHex: "#ECE5D8",
        image: "/merch/IMG_4958.JPG"
      },
      {
        colorName: "Highway Black",
        colorHex: "#1E1E1E",
        image: "/merch/IMG_4957.JPG"
      }
    ]
  },
  {
    id: "tee-somewhere",
    name: '"We Are All Going Somewhere" Expedition Tee',
    subtitle: "Universal Highway Statement Edition",
    type: "shirt",
    price: "$29.99",
    badge: "Core Expedition",
    description: "The core thesis behind our 2,000-mile experiment. Clean, striking typography reminding us that beneath all modern noise, every stranger on the road shares a common direction.",
    features: [
      "Heavyweight 240 GSM Cotton",
      "Drop-shoulder streetwear silhouette",
      "Thick rib-knit collar that won't sag",
      "Custom Trust The Thumb hem label"
    ],
    variants: [
      {
        colorName: "Off-White Cream",
        colorHex: "#ECE5D8",
        image: "/merch/IMG_4954.JPG"
      },
      {
        colorName: "Highway Black",
        colorHex: "#1E1E1E",
        image: "/merch/IMG_4953.JPG"
      }
    ]
  },
  {
    id: "hoodie-cardboard",
    name: '"Not Sure Where I\'m Heading" Fleece Hoodie',
    subtitle: "Heavyweight Road-Ready Pullover",
    type: "hoodie",
    price: "$49.99",
    badge: "Bestseller Hoodie",
    description: "Built for chilly 5:00 AM desert sunrises and late-night highway ramps. Premium heavyweight brushed fleece adorned with our signature cardboard thumbing graphic.",
    features: [
      "Ultra-Heavy 450 GSM Brushed Fleece",
      "Double-layered hood with metal-tipped drawstrings",
      "Spacious kangaroo pocket for essentials",
      "Heavyweight 2x2 ribbed cuffs & waistband"
    ],
    variants: [
      {
        colorName: "Off-White Cream",
        colorHex: "#ECE5D8",
        image: "/merch/IMG_4959.JPG"
      },
      {
        colorName: "Highway Black",
        colorHex: "#1E1E1E",
        image: "/merch/IMG_4960.JPG"
      }
    ]
  },
  {
    id: "hoodie-somewhere",
    name: '"We Are All Going Somewhere" Fleece Hoodie',
    subtitle: "Premium Streetwear Statement Fleece",
    type: "hoodie",
    price: "$49.99",
    badge: "Brotherhood Essential",
    description: "Our signature heavyweight hoodie. Ultra-soft interior, clean block statement typography across the chest, and engineered to withstand 2,000 miles of highway testing.",
    features: [
      "Ultra-Heavy 450 GSM Cotton/Poly Fleece",
      "High-contrast screen-printed typography",
      "Pre-shrunk for an enduring boxy fit",
      "Warm, wind-resistant double hood"
    ],
    variants: [
      {
        colorName: "Off-White Cream",
        colorHex: "#ECE5D8",
        image: "/merch/IMG_4955.JPG"
      },
      {
        colorName: "Highway Black",
        colorHex: "#1E1E1E",
        image: "/merch/IMG_4956.JPG"
      }
    ]
  }
];

export default function MerchSection() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "shirt" | "hoodie">("all");
  const [activeVariants, setActiveVariants] = useState<Record<string, number>>({
    "tee-cardboard": 0,
    "tee-somewhere": 0,
    "hoodie-cardboard": 0,
    "hoodie-somewhere": 0,
  });
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "tee-cardboard": "L",
    "tee-somewhere": "L",
    "hoodie-cardboard": "L",
    "hoodie-somewhere": "L",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<{
    product: Product;
    variant: ProductVariant;
    size: string;
  } | null>(null);

  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === "all") return true;
    return p.type === selectedFilter;
  });

  const handleSelectVariant = (productId: string, variantIndex: number) => {
    setActiveVariants((prev) => ({
      ...prev,
      [productId]: variantIndex,
    }));
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleOpenCheckout = (product: Product) => {
    const variantIndex = activeVariants[product.id] || 0;
    const variant = product.variants[variantIndex] || product.variants[0];
    const size = selectedSizes[product.id] || "L";
    setCheckoutProduct({ product, variant, size });
    setWaitlistSubmitted(false);
    setCheckoutError(null);
  };

  const STRIPE_LINKS = {
    shirt: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SHIRT || "https://buy.stripe.com/8x214g5wEa2Rc717C09IQ01",
    hoodie: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_HOODIE || "https://buy.stripe.com/6oU9AMgbib6V2wr6xW9IQ02",
  };

  const handleProceedToStripe = async () => {
    if (!checkoutProduct) return;
    setIsLoadingCheckout(true);
    setCheckoutError(null);

    // Direct Stripe payment link based on product type
    const directLink = checkoutProduct.product.type === "hoodie" 
      ? STRIPE_LINKS.hoodie 
      : STRIPE_LINKS.shirt;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: checkoutProduct.product.id,
          productName: checkoutProduct.product.name,
          type: checkoutProduct.product.type,
          price: checkoutProduct.product.type === "hoodie" ? 49.99 : 29.99,
          size: checkoutProduct.size,
          color: checkoutProduct.variant.colorName,
          image: checkoutProduct.variant.image,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (directLink) {
        window.location.href = directLink;
      } else {
        setCheckoutError("Redirecting to checkout...");
        window.location.href = directLink;
      }
    } catch (err: any) {
      if (directLink) {
        window.location.href = directLink;
      } else {
        setCheckoutError(err.message || "Failed to connect to checkout.");
      }
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSubmitted(true);
  };

  return (
    <section id="merch" className="py-20 sm:py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-desert/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-sunset/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-amber-desert/40 text-amber-desert text-xs font-mono font-bold uppercase shadow-amber-glow">
            <ShoppingBag className="w-3.5 h-3.5" />
            Official Expedition Merch
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment tracking-tight">
            WEAR THE <span className="text-gradient-amber">MOVEMENT</span>
          </h2>

          <p className="text-sm sm:text-base text-parchment-muted leading-relaxed max-w-2xl mx-auto">
            Heavyweight, highway-tested street apparel engineered for the 2,000-mile journey from Los Angeles to Ohio.
          </p>

          {/* Prominent All Funds Banner */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 p-4 rounded-2xl bg-amber-desert/10 border border-amber-desert/30 text-amber-desert text-xs sm:text-sm font-medium shadow-amber-glow text-left">
              <Heart className="w-5 h-5 shrink-0 fill-amber-desert text-amber-desert animate-pulse" />
              <span>
                <strong className="font-bold text-parchment">All funds go towards us.</strong> 100% of proceeds directly fund Lee and Jake&apos;s living expenses, emergency provisions, and gear preparation as we get ready to restart from LA to Ohio in 2027.
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              selectedFilter === "all"
                ? "bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker shadow-amber-glow"
                : "bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment"
            }`}
          >
            All Drops (4)
          </button>
          <button
            onClick={() => setSelectedFilter("shirt")}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              selectedFilter === "shirt"
                ? "bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker shadow-amber-glow"
                : "bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment"
            }`}
          >
            Heavyweight Tees — $29.99
          </button>
          <button
            onClick={() => setSelectedFilter("hoodie")}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              selectedFilter === "hoodie"
                ? "bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker shadow-amber-glow"
                : "bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment"
            }`}
          >
            Premium Hoodies — $49.99
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProducts.map((product) => {
            const variantIdx = activeVariants[product.id] || 0;
            const currentVariant = product.variants[variantIdx] || product.variants[0];
            const currentSize = selectedSizes[product.id] || "L";

            return (
              <div
                key={product.id}
                className="bg-asphalt-card/90 rounded-3xl border border-asphalt-border/80 overflow-hidden shadow-2xl hover:border-amber-desert/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Swatch Controls */}
                <div className="relative aspect-square w-full bg-asphalt-darker/60 overflow-hidden">
                  <img
                    src={currentVariant.image}
                    alt={`${product.name} - ${currentVariant.colorName}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-asphalt-darker/80 backdrop-blur-md border border-amber-desert/40 text-amber-desert text-[11px] font-mono font-bold uppercase shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {product.badge}
                    </span>
                  </div>

                  {/* Price Tag Pill */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker text-sm font-display font-black shadow-amber-glow">
                      {product.price}
                    </span>
                  </div>

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => setPreviewImage(currentVariant.image)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-asphalt-darker/80 backdrop-blur-md border border-asphalt-border text-parchment-muted hover:text-amber-desert hover:border-amber-desert transition-colors shadow-lg"
                    title="Inspect High-Res Photo"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Floating Color Swatches inside Image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 p-1.5 rounded-2xl bg-asphalt-darker/80 backdrop-blur-md border border-asphalt-border/60">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.colorName}
                        onClick={() => handleSelectVariant(product.id, idx)}
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          variantIdx === idx
                            ? "border-amber-desert scale-110 shadow-amber-glow ring-2 ring-amber-desert/40"
                            : "border-white/30 hover:border-white/70 opacity-80"
                        }`}
                        style={{ backgroundColor: v.colorHex }}
                        title={v.colorName}
                      >
                        {variantIdx === idx && (
                          <div className={`w-1.5 h-1.5 rounded-full ${v.colorHex === "#ECE5D8" || v.colorHex === "#C2A888" ? "bg-black" : "bg-white"}`} />
                        )}
                      </button>
                    ))}
                    <span className="text-[11px] font-mono text-parchment-muted pr-1.5">
                      {currentVariant.colorName}
                    </span>
                  </div>
                </div>

                {/* Product Info & Purchase Bar */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-parchment group-hover:text-amber-desert transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs font-mono text-amber-desert mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-display font-black text-2xl text-parchment">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-parchment-muted leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features list */}
                    <ul className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-parchment/80">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Size Selector & Order Button */}
                  <div className="space-y-4 pt-4 border-t border-asphalt-border/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-parchment-muted">Select Size:</span>
                      <div className="flex items-center gap-1.5">
                        {["S", "M", "L", "XL", "2XL"].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSelectSize(product.id, size)}
                            className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                              currentSize === size
                                ? "bg-amber-desert text-asphalt-darker font-black shadow-amber-glow"
                                : "bg-asphalt-darker border border-asphalt-border text-parchment-muted hover:text-parchment"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenCheckout(product)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-black text-sm tracking-wide shadow-amber-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                      <span>Order {product.name.includes("Hoodie") ? "Hoodie" : "Tee"} — {product.price}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-parchment-muted/80 pt-1">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-amber-desert" />
                        Ships Nationwide
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                        Direct Artist Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadside Guarantee Footer Card */}
        <div className="bg-asphalt-card/60 rounded-3xl p-6 sm:p-8 border border-amber-desert/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 flex items-center justify-center text-amber-desert shrink-0 shadow-amber-glow">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-parchment">
                100% of Merch Proceeds Support Our 2027 Restart
              </h4>
              <p className="text-xs text-parchment-muted mt-1 leading-relaxed">
                We are 100% community powered and independently funded. Every shirt and hoodie sold supports our equipment, preparation, and upcoming 2,000-mile fresh restart from Los Angeles to Ohio in 2027.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Image Inspection */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-asphalt-card text-parchment hover:text-amber-desert"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="High resolution merch detail"
              className="max-h-[85vh] w-auto rounded-2xl object-contain border border-asphalt-border shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Checkout / Order Intent Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-asphalt-darker border border-amber-desert/40 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            
            <button
              onClick={() => setCheckoutProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-asphalt-card text-parchment-muted hover:text-parchment transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-desert/15 border border-amber-desert/30 text-amber-desert text-xs font-mono font-bold uppercase">
                <ShoppingBag className="w-3.5 h-3.5" />
                Selected Drop
              </div>
              <h3 className="font-display font-black text-2xl text-parchment">
                {checkoutProduct.product.name}
              </h3>
            </div>

            {/* Selected Item Summary */}
            <div className="flex gap-4 p-3.5 rounded-2xl bg-asphalt-card border border-asphalt-border/60">
              <img
                src={checkoutProduct.variant.image}
                alt={checkoutProduct.product.name}
                className="w-20 h-20 rounded-xl object-cover border border-asphalt-border shrink-0"
              />
              <div className="flex flex-col justify-center space-y-1">
                <div className="font-display font-bold text-lg text-parchment">
                  {checkoutProduct.product.price}
                </div>
                <div className="text-xs font-mono text-amber-desert">
                  Color: {checkoutProduct.variant.colorName}
                </div>
                <div className="text-xs font-mono text-parchment-muted">
                  Size: <span className="font-bold text-parchment">{checkoutProduct.size}</span>
                </div>
              </div>
            </div>

            {/* Direct Funds Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-desert/10 border border-amber-desert/20 text-xs text-amber-desert space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-amber-desert" />
                All Funds Go Directly Towards Us
              </div>
              <p className="text-[11px] text-parchment-muted">
                100% of this {checkoutProduct.product.price} purchase funds Lee & Jake on the highway across America.
              </p>
            </div>

            {/* Stripe Checkout Action & Pre-order Option */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleProceedToStripe}
                disabled={isLoadingCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-black text-sm shadow-amber-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoadingCheckout ? (
                  <>
                    <div className="w-4 h-4 border-2 border-asphalt-darker border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Stripe...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>Proceed to Stripe Checkout — {checkoutProduct.product.price}</span>
                  </>
                )}
              </button>

              {checkoutError && (
                <div className="p-3 rounded-xl bg-asphalt-card border border-amber-desert/30 text-amber-desert text-xs font-mono">
                  {checkoutError}
                </div>
              )}

              {/* Email backup reservation */}
              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="pt-2 border-t border-asphalt-border/50 space-y-3">
                  <div className="text-[11px] font-mono text-parchment-muted">
                    Or get notified with exclusive drop link & receipt:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-asphalt-card border border-asphalt-border focus:border-amber-desert focus:outline-none text-parchment text-xs font-mono placeholder:text-parchment-muted/50"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-asphalt-card border border-asphalt-border hover:border-amber-desert/50 text-parchment text-xs font-mono font-bold transition-all"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-3 rounded-xl bg-sage/15 border border-sage/30 text-sage text-xs text-center">
                  Reservation saved for {waitlistEmail}!
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
