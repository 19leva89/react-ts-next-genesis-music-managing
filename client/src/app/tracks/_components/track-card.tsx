'use client'

import Image from 'next/image'
import { useState } from 'react'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui'
import { Track } from '@/app/types'
import { usePlayer } from '@/hooks/use-player'
import { DeleteTrack, EditTrack, PlayButton } from '@/components/shared'

interface Props {
	data: Track
}

export const TrackCard = ({ data }: Props) => {
	const setTrack = usePlayer((state) => state.setTrack)

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

	return (
		<Card
			className='group relative m-3 overflow-hidden border-none bg-neutral-400/5 p-2 transition hover:bg-neutral-400/10'
			data-testid={`track-item-${data.id}`}
		>
			<CardHeader className='relative p-0'>
				<div className='aspect-square w-full overflow-hidden rounded-lg'>
					<Image
						src={data.coverImage || '/img/no-cover-image.png'}
						alt='Album Artwork'
						fill
						className='object-cover'
					/>

					{/* Dropdown Menu Button */}
					<div className='absolute top-2 right-2 z-10'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className='cursor-pointer'>
								<Button variant='secondary' size='icon' className='bg-neutral-900/5 p-1'>
									<EllipsisVerticalIcon className='size-4' />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent side='right' align='start' className='rounded-xl'>
								<DropdownMenuItem
									onSelect={() => setIsDialogOpen(true)}
									className='cursor-pointer'
									data-testid={`edit-track-${data.id}`}
								>
									<PencilIcon className='mr-2 size-4' />
									Edit
								</DropdownMenuItem>

								<DropdownMenuItem
									onSelect={() => setIsDeleteDialogOpen(true)}
									className='cursor-pointer'
									data-testid={`delete-track-${data.id}`}
								>
									<TrashIcon className='mr-2 size-4' />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-1 p-2'>
				<CardTitle className='truncate text-base text-white' data-testid={`track-item-${data.id}-title`}>
					{data.title}
				</CardTitle>

				<CardDescription className='truncate text-sm' data-testid={`track-item-${data.id}-artist`}>
					By {data.artist}
				</CardDescription>
			</CardContent>

			<CardFooter className='absolute right-0 bottom-5 z-10'>
				<PlayButton onClick={() => setTrack(data)} />
			</CardFooter>

			{/* Edit Dialog */}
			<EditTrack track={data} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

			{/* Delete Dialog */}
			<DeleteTrack track={data} isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} />
		</Card>
	)
}
