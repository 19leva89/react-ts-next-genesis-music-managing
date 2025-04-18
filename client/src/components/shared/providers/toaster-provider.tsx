'use client'

import { Toaster } from 'sonner'

const ToasterProvider = () => {
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

export default ToasterProvider
