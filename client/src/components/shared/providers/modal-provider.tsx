'use client'

import { useEffect, useState } from 'react'

import { UploadModal } from '@/components/shared'

interface Props {
	products: any[]
}

export const ModalProvider = ({ products }: Props) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<UploadModal />
		</>
	)
}
