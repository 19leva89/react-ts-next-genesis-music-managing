import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Figtree } from 'next/font/google'

import { Toaster } from '@/components/ui'
import { Player, Sidebar } from '@/components/shared'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Music App',
	description: 'Listen to music',
}

export const revalidate = 0

export default async function RootLayout({ children }: PropsWithChildren) {
	// const userSongs = await getSongsByUserId()
	// const products = await getActiveProductsWithPrices()

	return (
		<html lang="en">
			<body className={font.className}>
				<Toaster position="bottom-right" expand={false} richColors />

				<Sidebar songs={[]}>{children}</Sidebar>

				<Player />
			</body>
		</html>
	)
}
