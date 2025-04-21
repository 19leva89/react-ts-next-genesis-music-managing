'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui'
import { Genre } from '@/app/types'
import { addTrack, getAllGenres } from '@/app/actions'
import { useUploadModal } from '@/hooks/use-upload-modal'

export const UploadModal = () => {
	const router = useRouter()
	const uploadModal = useUploadModal()

	const [isLoading, setIsLoading] = useState(false)
	const [selectedGenreId, setSelectedGenreId] = useState('')
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
	const [availableGenres, setAvailableGenres] = useState<Genre[]>([])

	const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
		defaultValues: {
			title: '',
			artist: '',
			album: '',
			genres: [],
			coverImage: '',
		},
	})

	useEffect(() => {
		getAllGenres()
			.then(setAvailableGenres)
			.catch(() => toast.error('Failed to load genres'))
	}, [])

	const onClose = () => {
		reset()
		setSelectedGenres([])
		uploadModal.onClose()
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			await addTrack({
				title: values.title,
				artist: values.artist,
				album: values.album,
				genres: selectedGenres.map((genre) => genre.id),
				coverImage: values.coverImage,
			})

			toast.success('Track created!')
			onClose()
			router.refresh()
		} catch (err: any) {
			toast.error(err.message || 'Something went wrong.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleAddGenre = (id: string) => {
		const genre = availableGenres.find((g) => g.id === id)
		if (!genre || selectedGenres.some((g) => g.id === id)) return

		const updatedGenres = [...selectedGenres, genre]
		setSelectedGenres(updatedGenres)
		setSelectedGenreId('')
		setValue(
			'genres',
			updatedGenres.map((g) => g.id),
		)
	}

	const removeGenre = (id: string) => {
		const updatedGenres = selectedGenres.filter((g) => g.id !== id)
		setSelectedGenres(updatedGenres)
		setValue(
			'genres',
			updatedGenres.map((g) => g.id),
		)
	}

	return (
		<Dialog open={uploadModal.isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Track</DialogTitle>

					<DialogDescription>Enter track metadata</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
					<Input
						id="title"
						placeholder="Track Title"
						disabled={isLoading}
						{...register('title', { required: true })}
					/>

					<Input
						id="artist"
						placeholder="Artist"
						disabled={isLoading}
						{...register('artist', { required: true })}
					/>

					<Input id="album" placeholder="Album (optional)" disabled={isLoading} {...register('album')} />

					<Input
						id="coverImage"
						placeholder="Cover Image URL"
						disabled={isLoading}
						{...register('coverImage', { required: true })}
					/>

					{/* Genre Input */}
					<div className="flex items-center gap-2">
						<Select
							value={selectedGenreId}
							onValueChange={(value) => {
								setSelectedGenreId(value)
								handleAddGenre(value)
							}}
							disabled={isLoading}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select genre" />
							</SelectTrigger>

							<SelectContent>
								{availableGenres
									.filter((g) => !selectedGenres.some((sel) => sel.id === g.id))
									.map((genre) => (
										<SelectItem key={genre.id} value={genre.id}>
											{genre.name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-wrap gap-2">
						{selectedGenres.map((genre) => (
							<div key={genre.id} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
								<span>{genre.name}</span>

								<button
									type="button"
									onClick={() => removeGenre(genre.id)}
									className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
								>
									×
								</button>
							</div>
						))}
					</div>

					<div>
						<div className="pb-1 text-sm text-muted-foreground">Select a Track File</div>

						<Input
							id="track"
							type="file"
							accept=".mp3"
							disabled={isLoading}
							{...register('track', { required: true })}
						/>
					</div>

					<Button variant="default" size="lg" disabled={isLoading} type="submit" className="cursor-pointer">
						Create
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
