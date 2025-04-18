'use client'

import { useEffect, useState } from 'react'

import { ProductWithPrice } from '@/types'
import { AuthModal, SubscribeModal, UploadModal } from '@/components/shared'

interface Props {
	products: ProductWithPrice[]
}

export const ModalProvider = ({ products }: Props) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<AuthModal />

			<UploadModal />

			<SubscribeModal products={products} />
		</>
	)
}
