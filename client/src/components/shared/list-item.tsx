'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { PlayButton } from '@/components/shared'

interface Props {
	image: string
	name: string
	href: string
}

export const ListItem = ({ href, image, name }: Props) => {
	const router = useRouter()

	const onClick = () => {
		router.push(href)
	}

	return (
		<div
			onClick={onClick}
			className='group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20'
			data-testid='track-item-{id}'
		>
			<div className='relative min-h-[64px] min-w-[64px]'>
				<Image src={image} alt='LikeImage' className='object-cover' fill />
			</div>

			<p className='truncate py-5 font-medium' data-testid={`track-item-${name}-title`}>
				{name}
			</p>

			<PlayButton />
		</div>
	)
}
