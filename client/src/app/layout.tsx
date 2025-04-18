import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Figtree } from 'next/font/google'

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
				<ToasterProvider />

				<SupabaseProvider>
					<UserProvider>
						<ModalProvider products={products} />

						<Sidebar songs={userSongs}>{children}</Sidebar>

						<Player />
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
