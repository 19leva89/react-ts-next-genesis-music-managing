import { Song } from '@/types'

export const useLoadImage = (song: Song) => {
	// const supabaseClient = useSupabaseClient()

	if (!song) return null

	// const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.image_path)

	return
}
