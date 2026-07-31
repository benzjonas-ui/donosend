import Stripe from 'stripe'

export default async (request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const signature = request.headers.get('stripe-signature')
  const rawBody = await request.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, { status: 400 })
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('Completed Donosend checkout', session.id, session.metadata)
    // TODO: Zahlung und Wirkung in Supabase speichern.
  }
  return Response.json({ received: true })
}
