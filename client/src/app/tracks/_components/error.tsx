'use client'

import { Box } from '@/components/shared'

export const Error = () => {
	return (
		<Box className='flex h-full items-center justify-center' data-testid='error-generic'>
			<div className='text-neutral-400'>Something Went Wrong</div>
		</Box>
	)
}
