import { toast } from 'sonner'
import { useEffect, useMemo, useState } from 'react'

import { Track } from '@/app/types'

export const useGetSongById = (id?: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [track, setSong] = useState<Track | undefined>(undefined)

	// const { supabaseClient } = useSessionContext()

	useEffect(() => {
		if (!id) return

		setIsLoading(true)

		const fetchSong = async () => {
			// const { data, error } = await supabaseClient.from('tracks').select('*').eq('id', id).single()

			// if (error) {
			// 	setIsLoading(false)
			// 	return toast.error(error.message)
			// }

			// setSong(data as Track)
			setIsLoading(false)
		}

		fetchSong()
	}, [id])

	return useMemo(() => ({ isLoading, track }), [isLoading, track])
}
