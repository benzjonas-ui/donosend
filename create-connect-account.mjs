import Stripe from 'stripe'

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const baseUrl = process.env.SITE_URL || new URL(request.url).origin
    const account = await stripe.accounts.create({ type: 'express', country: 'DE', capabilities: { card_payments: { requested: true }, transfers: { requested: true } } })
    const link = await stripe.accountLinks.create({ account: account.id, refresh_url: `${baseUrl}/dashboard`, return_url: `${baseUrl}/dashboard?connect=complete`, type: 'account_onboarding' })
    return Response.json({ accountId: account.id, url: link.url })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Stripe Connect konnte nicht gestartet werden.' }, { status: 500 })
  }
}
