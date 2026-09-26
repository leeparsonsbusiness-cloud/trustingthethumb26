import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, productName, type, price, size, color, image } = body;

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trustthethumb.com";

    // Direct Stripe Payment Link fallbacks (if configured via env)
    const paymentLinkShirt = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SHIRT;
    const paymentLinkHoodie = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_HOODIE;

    if (!secretKey) {
      // If Secret Key is not configured yet, check if payment link is set
      if (type === "hoodie" && paymentLinkHoodie) {
        return NextResponse.json({ url: paymentLinkHoodie });
      }
      if (type === "shirt" && paymentLinkShirt) {
        return NextResponse.json({ url: paymentLinkShirt });
      }

      return NextResponse.json(
        { 
          error: "STRIPE_SECRET_KEY_MISSING",
          message: "Stripe Secret Key is not configured in environment variables.",
          mockCheckout: true 
        },
        { status: 200 }
      );
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-08-26.dahlia" as any,
    });

    const fullImageUrl = image && image.startsWith("http") 
      ? image 
      : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;

    const unitAmount = Math.round(Number(price || (type === "hoodie" ? 49.99 : 29.99)) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${productName} — ${color} (Size: ${size})`,
              description: `Trust The Thumb Official Merch • 100% of proceeds fund Lee & Jake's 2,000-mile journey from LA to Ohio`,
              images: image ? [fullImageUrl] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NL", "NZ"],
      },
      custom_fields: [
        {
          key: "trail_shoutout",
          label: { type: "custom", custom: "Trail Note for Lee & Jake (Optional)" },
          type: "text",
          optional: true,
        },
      ],
      metadata: {
        productId,
        productName,
        type,
        size,
        color,
      },
      success_url: `${siteUrl}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#merch`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
