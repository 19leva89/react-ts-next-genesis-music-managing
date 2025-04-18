'use client'

import { Toaster } from 'sonner'

export const ToasterProvider = () => {
	return (
		<Toaster
			toastOptions={{
				style: {
					background: '#333',
					color: '#fff',
				},
			}}
		/>
	)
}
