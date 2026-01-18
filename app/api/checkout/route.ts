import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe (Fix: Removed strict apiVersion to stop the error)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
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
      // Change these URLs if you deploy to a custom domain later
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
      
      subscription_data: {
        trial_period_days: 30,
        metadata: { userId: userId }
      },
      allow_promotion_codes: true,
    });

    // Fix: Send the full URL back to the frontend
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}