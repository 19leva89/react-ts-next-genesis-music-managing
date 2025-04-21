import { Track } from '@/app/types'

import { usePlayer } from '@/hooks/use-player'

export const useOnPlay = (tracks: Track[]) => {
	const player = usePlayer()

	const onPlay = (id: string) => {
		player.setId(id)
		player.setIds(tracks.map((track) => track.id))
	}

	return onPlay
}
