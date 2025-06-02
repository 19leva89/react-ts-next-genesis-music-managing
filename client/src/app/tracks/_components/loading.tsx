'use client'

import { BounceLoader } from 'react-spinners'

import { Box } from '@/components/shared'

export const Loading = () => {
	return (
		<Box className='flex h-full items-center justify-center' data-testid='loading-indicator'>
			<BounceLoader color='#22c55e' size={40} />
		</Box>
	)
}
