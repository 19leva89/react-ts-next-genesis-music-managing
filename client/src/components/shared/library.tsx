'use client'

import { ListMusicIcon, PlusIcon } from 'lucide-react'

import { Track } from '@/app/types'
import { MediaItem } from '@/components/shared'
import { useUploadModal } from '@/hooks/use-upload-modal'

interface Props {
	tracks: Track[]
}

export const Library = ({ tracks }: Props) => {
	const uploadModal = useUploadModal()

	const onClick = () => {
		return uploadModal.onOpen()
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<ListMusicIcon size={26} className='size-6 text-neutral-400' />

					<p className='text-md font-medium text-neutral-400'>Your Library</p>
				</div>

				<PlusIcon
					size={20}
					onClick={onClick}
					className='size-5 cursor-pointer text-neutral-400 transition hover:text-white'
					data-testid='create-track-button'
				/>
			</div>

			<div className='mt-4 flex flex-col gap-y-2 px-3'>
				{tracks.map((track) => (
					<MediaItem onClick={() => {}} key={track.id} data={track} />
				))}
			</div>
		</div>
	)
}
