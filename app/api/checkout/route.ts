import { NextResponse } from "next/server";
import Stripe from "stripe";

// FIX: 1. Lazy initialization or safety check
// This prevents the "build" from crashing if the key is missing during the build step.
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  // We log this so we can see it in Vercel logs, but we don't crash the build immediately
  // unless someone actually TRIES to use the API.
  console.error("CRITICAL ERROR: STRIPE_SECRET_KEY is missing from Environment Variables!");
}

// We initialize Stripe only if the key exists, otherwise we'll handle it inside the function
const stripe = stripeKey ? new Stripe(stripeKey) : null;

export async function POST(req: Request) {
  try {
    // FIX: 2. Runtime check
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Missing STRIPE_SECRET_KEY." },
        { status: 500 }
      );
    }

    const { priceId, email, userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email, 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
      subscription_data: {
        trial_period_days: 30,
        metadata: { userId: userId }
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}