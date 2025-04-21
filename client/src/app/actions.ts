import { request } from '@/lib/api'
import type { AddTrackInput, Genre, GetAllTracksParams, Track } from '@/app/types'

export const getAllGenres = async (): Promise<Genre[]> => {
	const response = await request<string[]>({
		url: '/api/genres',
		method: 'GET',
	})

	return response.map((name) => ({
		id: name.toLowerCase().replace(/\s+/g, '-'),
		name,
	}))
}

export const getAllTracks = async ({
	page = 1,
	limit = 10,
	sort,
	order,
	search,
	genre,
	artist,
}: GetAllTracksParams): Promise<{
	data: Track[]
	meta: { total: number; page: number; totalPages: number }
}> => {
	const response = await request<{
		data: Track[]
		meta: { total: number; page: number; totalPages: number }
	}>({
		url: '/api/tracks',
		method: 'GET',
		params: { page, limit, sort, order, search, genre, artist },
	})

	return response
}

export const addTrack = async (input: AddTrackInput): Promise<Track> => {
	return await request<Track>({
		url: '/api/tracks',
		method: 'POST',
		data: input,
	})
}

export const removeTrack = async (id: string): Promise<void> => {
	await request({
		url: `/api/tracks/${id}`,
		method: 'DELETE',
	})
}
