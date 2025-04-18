import { Song } from '@/types'

import { usePlayer } from '@/hooks/use-player'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useSubscribeModal } from '@/hooks/use-subscribe-modal'

export const useOnPlay = (songs: Song[]) => {
	const player = usePlayer()
	const subscribeModal = useSubscribeModal()
	const authModal = useAuthModal()
	// const { user, subscription } = useUser()

	const onPlay = (id: string) => {
		// if (!user) return authModal.onOpen()

		// UnComment to Only Allow Subscribed User to Play Song.
		// if (!subscription) return subscribeModal.onOpen();

		player.setId(id)
		player.setIds(songs.map((song) => song.id))
	}

	return onPlay
}
