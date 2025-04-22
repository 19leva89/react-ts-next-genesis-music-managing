'use client'

import Image from 'next/image'

import { Track } from '@/app/types'
import { Wavesurfer } from '@/components/shared'
import { BACKEND_API_URL } from '@/lib/constants'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui'

interface Props {
	track: Track
	isOpen: boolean
	onClose: () => void
}

export const Player = ({ track, isOpen, onClose }: Props) => {
	const fullUrl = `${BACKEND_API_URL}/files/${track.audioFile}`

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<div className="flex flex-col items-center gap-4">
					<div className="relative w-64 h-64">
						<Image
							src={track.coverImage || '/img/no-cover-image.png'}
							alt="Album Artwork"
							fill
							className="object-cover rounded-lg"
						/>
					</div>

					<div className="text-center">
						<DialogTitle className="text-lg font-semibold">{track.title}</DialogTitle>

						<DialogDescription className="text-sm text-muted-foreground">{track.artist}</DialogDescription>
					</div>

					{track.audioFile ? (
						<Wavesurfer audioUrl={fullUrl} />
					) : (
						<p className="text-sm text-muted-foreground">No audio file found</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
