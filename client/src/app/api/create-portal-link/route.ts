import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { stripe } from '@/lib/stripe'
import { getUrl } from '@/lib/helpers'
import { createOrRetrieveCustomer } from '@/lib/supabase-admin'

export async function POST() {
	try {
		const supabase = createRouteHandlerClient({ cookies })

		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user) throw new Error('Could Not Get User.')

		const customer = await createOrRetrieveCustomer({
			uuid: user.id || '',
			email: user.email || '',
		})

		if (!customer) throw new Error('No Customer!')

		const { url } = await stripe.billingPortal.sessions.create({
			customer,
			return_url: `${getUrl()}/account`,
		})

		return NextResponse.json({ url })
	} catch (error: any) {
		console.error(error)
		return new NextResponse('Internal Error.', { status: 500 })
	}
}
