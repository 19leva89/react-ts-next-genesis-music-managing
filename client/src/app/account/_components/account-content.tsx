'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useUser } from '@/hooks/use-user'
import { postData } from '@/lib/helpers'
import { Button } from '@/components/shared/button'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

export const AccountContent = () => {
	const router = useRouter()
	const subscribeModal = useSubscribeModal()
	const { isLoading, subscription, user } = useUser()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!isLoading && !user) router.replace('/')
	}, [isLoading, user, router])

	const redirectToCustomerPortal = async () => {
		setLoading(true)

		try {
			const { url, error } = await postData({
				url: '/api/create-portal-link',
			})
			window.location.assign(url)
		} catch (error) {
			console.error(error)
			toast.error((error as Error).message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mb-7 px-6">
			{!subscription && (
				<div className="flex flex-col gap-y-4">
					<p>No Active Plan.</p>
					<Button className="w-[300px]" onClick={subscribeModal.onOpen}>
						Subscribe
					</Button>
				</div>
			)}
			{subscription && (
				<div className="flex flex-col gap-y-4">
					<p>
						You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
					</p>
					<Button className="w-[300px]" disabled={loading || isLoading} onClick={redirectToCustomerPortal}>
						Open Customer Portal
					</Button>
				</div>
			)}
		</div>
	)
}
