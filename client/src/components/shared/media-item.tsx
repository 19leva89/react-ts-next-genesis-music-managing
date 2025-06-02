'use client'

import Image from 'next/image'

import { Track } from '@/app/types'

interface Props {
	data: Track
	onClick?: (id: string) => void
}

export const MediaItem = ({ data, onClick }: Props) => {
	const handleClick = () => {
		if (onClick) {
			onClick(data.id)
		}
	}

	return (
		<div
			onClick={handleClick}
			className='flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50'
			data-testid={`track-item-${data.id}`}
		>
			<div className='relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md'>
				<Image
					fill
					src={data.coverImage || '/img/no-cover-image.png'}
					alt='Media Item Image'
					className='object-cover'
				/>
			</div>

			<div className='flex flex-col gap-y-1 overflow-hidden'>
				<p className='truncate text-white' data-testid={`track-item-${data.id}-title`}>
					{data.title}
				</p>

				<p className='truncate text-sm text-neutral-400' data-testid={`track-item-${data.id}-artist`}>
					{data.artist}
				</p>
			</div>
		</div>
	)
}
