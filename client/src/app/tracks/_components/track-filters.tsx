'use client'

import { FormEvent, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { useGetGenres } from '@/hooks/use-get-genres'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'

interface Props {
	sortField: string
	sortOrder: 'asc' | 'desc'
	searchQuery: string
	sortGenre: string
}

export const TrackFilters = ({ sortField, sortOrder, searchQuery, sortGenre }: Props) => {
	const router = useRouter()
	const params = useSearchParams()

	const { genres: availableGenres, loadGenres } = useGetGenres()

	const updateSearchParams = (newParams: Partial<Record<string, string>>) => {
		const updatedParams = new URLSearchParams(params.toString())

		Object.entries(newParams).forEach(([key, value]) => {
			if (value) {
				updatedParams.set(key, value)
			} else {
				updatedParams.delete(key)
			}
		})

		router.push(`?${updatedParams.toString()}`)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const search = formData.get('search') as string

		updateSearchParams({ search })
	}

	useEffect(() => {
		if (sortGenre && sortGenre !== 'genre') {
			updateSearchParams({ genre: sortGenre })
		}
	}, [sortGenre])

	useEffect(() => {
		loadGenres()
	}, [])

	return (
		<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto text-white">
			<div className="flex gap-3">
				{/* Sort filter */}
				<Select value={sortField} onValueChange={(value) => updateSearchParams({ sort: value })}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="title">Title</SelectItem>
						<SelectItem value="artist">Artist</SelectItem>
						<SelectItem value="album">Album</SelectItem>
						<SelectItem value="createdAt">Date added</SelectItem>
					</SelectContent>
				</Select>

				{/* Genre filter */}
				<Select
					value={sortGenre}
					onValueChange={(value) => updateSearchParams({ genre: value === 'all' ? undefined : value })}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select genre" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="all">All genres</SelectItem>

						{availableGenres.map((genre) => (
							<SelectItem key={genre} value={genre}>
								{genre}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Order filter */}
				<Select value={sortOrder} onValueChange={(value) => updateSearchParams({ order: value })}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Order" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="desc">Descending</SelectItem>
						<SelectItem value="asc">Ascending</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					name="search"
					placeholder="Search tracks..."
					defaultValue={searchQuery}
					className="w-full md:w-[200px] text-white"
				/>

				<Button variant="secondary" type="submit">
					Search
				</Button>
			</form>
		</div>
	)
}
