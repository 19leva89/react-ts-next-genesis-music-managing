'use client'

import { usePlayer } from '@/hooks/use-player'
import { PlayerContent } from '@/components/shared'
import { useGetSongById } from '@/hooks/use-get-track-by-id'
import { useLoadTrackUrl } from '@/hooks/use-load-track-url'

export const Player = () => {
	const player = usePlayer()
	const { track } = useGetSongById(player.activeId)

	const songUrl = useLoadTrackUrl(track!)

	if (!track || !songUrl || !player.activeId) return null

	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			<PlayerContent key={songUrl} track={track} songUrl={songUrl} />
		</div>
	)
}
