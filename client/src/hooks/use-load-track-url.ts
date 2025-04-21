import { Track } from '@/app/types'

export const useLoadTrackUrl = (track: Track) => {
	// const supabaseClient = useSupabaseClient()

	if (!track) return ''

	// const { data: songData } = supabaseClient.storage.from('tracks').getPublicUrl(track.song_path)

	return
}
