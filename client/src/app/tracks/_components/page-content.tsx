'use client'

import { Track } from '@/app/types'

import { TrackItem } from '@/components/shared'
import { useOnPlay } from '@/hooks/use-on-play'

interface Props {
	tracks: Track[]
}

export const PageContent = ({ tracks }: Props) => {
	const onPlay = useOnPlay(tracks)

	if (!Array.isArray(tracks) || tracks.length === 0) {
		return <div className="mt-4 text-neutral-400">No Tracks Available</div>
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-0 mt-4">
			{tracks.map((track) => (
				<TrackItem
					key={track.id}
					data={track}
					onClick={(id: string) => {
						onPlay(id)
					}}
				/>
			))}
		</div>
	)
}
