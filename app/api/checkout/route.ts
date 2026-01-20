import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // 1. Remove priceId from here (we don't trust the client)
    const { email, userId } = await req.json();

    // 2. 🔒 HARDCODE YOUR LIVE PRICE ID HERE
    const PRICE_ID = "price_1SrSoe2Mz7E8Yvh22HwyRf8y"; // <--- PASTE YOUR LIVE ID HERE!

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email, 
      line_items: [
        {
          price: PRICE_ID, // Use the constant
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
      subscription_data: {
        trial_period_days: 7, 
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