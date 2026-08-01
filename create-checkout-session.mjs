import Stripe from 'stripe'

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    if (!process.env.STRIPE_SECRET_KEY) return Response.json({ error: 'Stripe Secret Key fehlt in Netlify.' }, { status: 500 })
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const body = await request.json()
    const amount = Math.round(Number(body.amount) * 100)
    if (!Number.isFinite(amount) || amount < 50) return Response.json({ error: 'Der Mindestbetrag beträgt 0,50 €.' }, { status: 400 })

    const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || new URL(request.url).origin
    const seller = body.partnerName || 'Jonas Benz'
    const organisation = body.causeName || 'Pro Vita Animale e.V.'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Donosend Test über ${seller}`,
            description: `1,00-€-Testbeitrag für ${organisation} (Demo)`
          },
          unit_amount: amount
        },
        quantity: 1
      }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&seller=jonas&organisation=pro-vita-animale&amount=1.00`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        partnerId: body.partnerId || 'jonas',
        partnerName: seller,
        causeId: body.causeId || 'pro-vita-animale',
        causeName: organisation,
        campaignName: body.campaignName || 'Erster Donosend-Testlauf',
        mode: 'demo'
      }
    })
    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error', error)
    return Response.json({ error: error?.message || 'Stripe Checkout konnte nicht gestartet werden.' }, { status: 500 })
  }
}
