import { useEffect, useMemo, useState } from 'react'

import { Track } from '@/app/types'

export const useGetSongById = (id?: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [track, setSong] = useState<Track | undefined>(undefined)

	useEffect(() => {
		if (!id) return

		setIsLoading(true)

		const fetchSong = async () => {
			setIsLoading(false)
		}

		fetchSong()
	}, [id])

	return useMemo(() => ({ isLoading, track }), [isLoading, track])
}
