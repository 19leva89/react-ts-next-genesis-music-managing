'use client'

import usePlayer from '@/src/hooks/use-player'
import useGetSongById from '@/src/hooks/use-get-song-by-id'
import useLoadSongUrl from '@/src/hooks/use-load-song-url'

import PlayerContent from './player-content'

export const Player = () => {
	const player = usePlayer()
	const { song } = useGetSongById(player.activeId)

	const songUrl = useLoadSongUrl(song!)

	if (!song || !songUrl || !player.activeId) return null

	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			<PlayerContent key={songUrl} song={song} songUrl={songUrl} />
		</div>
	)
}
