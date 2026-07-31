import Stripe from 'stripe'

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const body = await request.json()
    const amount = Math.round(Number(body.amount) * 100)
    if (!Number.isFinite(amount) || amount < 50) {
      return Response.json({ error: 'Der Mindestbetrag beträgt 0,50 €.' }, { status: 400 })
    }
    const baseUrl = process.env.SITE_URL || new URL(request.url).origin
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency: 'eur', product_data: { name: 'Donosend Pilotzahlung', description: 'Testzahlung mit transparenter Wirkung' }, unit_amount: amount }, quantity: 1 }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: { partnerId: body.partnerId || 'unknown', causeId: body.causeId || 'unknown' }
    })
    return Response.json({ url: session.url })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Stripe Checkout konnte nicht gestartet werden.' }, { status: 500 })
  }
}
