'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'

import { useAuthModal } from '@/hooks/use-auth-modal'
import { Modal } from '@/components/shared/modal'

export const AuthModal = () => {
	const router = useRouter()
	const supabaseClient = useSupabaseClient()

	const { session } = useSessionContext()
	const { onClose, isOpen } = useAuthModal()

	useEffect(() => {
		if (session) {
			router.refresh()
			onClose()
		}
	}, [session, router, onClose])

	const onChange = (open: boolean) => {
		if (!open) onClose()
	}

	return (
		<Modal title="Welcome Back" description="Log In to Your Account" isOpen={isOpen} onChange={onChange}>
			<Auth
				theme="dark"
				providers={['github']}
				magicLink
				supabaseClient={supabaseClient}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#404040',
								brandAccent: '#22c55e',
							},
						},
					},
				}}
			/>
		</Modal>
	)
}
