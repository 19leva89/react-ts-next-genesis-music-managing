'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { addTrack } from '@/app/actions'
import { useGetGenres } from '@/hooks/use-get-genres'
import { useUploadModal } from '@/hooks/use-upload-modal'

export const UploadModal = () => {
	const router = useRouter()
	const uploadModal = useUploadModal()

	const { genres: availableGenres } = useGetGenres()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedGenreId, setSelectedGenreId] = useState<string>('')

	const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
		defaultValues: {
			title: '',
			artist: '',
			album: '',
			genres: [],
			coverImage: '',
		},
	})

	const onClose = () => {
		reset()
		setSelectedGenres([])
		uploadModal.onClose()
	}

	const isValidImageUrl = async (url: string): Promise<boolean> => {
		if (!url) return true

		return new Promise((resolve) => {
			const img = new Image()
			img.onload = () => resolve(true)
			img.onerror = () => resolve(false)
			img.src = url
		})
	}

	const onValid: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			const isImageOk = await isValidImageUrl(values.coverImage)
			if (!isImageOk) {
				toast.error('Invalid image URL')

				setIsLoading(false)
				return
			}

			await addTrack({
				title: values.title,
				artist: values.artist,
				album: values.album,
				genres: selectedGenres,
				coverImage: values.coverImage,
			})

			toast.success('Track created!')
			onClose()
			router.refresh()
		} catch (err: any) {
			toast.error(err.message || 'Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	const onInvalid = (errors: any) => {
		if (errors.title) toast.error('Title is required')

		if (errors.artist) toast.error('Artist is required')

		if (errors.coverImage) toast.error(errors.coverImage.message)
	}

	const handleAddGenre = (genre: string) => {
		if (selectedGenres.includes(genre)) return
		const updated = [...selectedGenres, genre]

		setSelectedGenres(updated)
		setSelectedGenreId('')
		setValue('genres', updated)
	}

	const removeGenre = (genre: string) => {
		const updated = selectedGenres.filter((g) => g !== genre)

		setSelectedGenres(updated)
		setValue('genres', updated)
	}

	return (
		<Dialog open={uploadModal.isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create track</DialogTitle>

					<DialogDescription>Enter track metadata</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(onValid, onInvalid)}
					className='flex flex-col gap-y-4'
					data-testid='track-form'
				>
					<Input
						id='title'
						placeholder='Title'
						disabled={isLoading}
						{...register('title', { required: true })}
						data-testid='input-title'
					/>

					<Input
						id='artist'
						placeholder='Artist'
						disabled={isLoading}
						{...register('artist', { required: true })}
						data-testid='input-artist'
					/>

					<Input
						id='album'
						placeholder='Album (optional)'
						disabled={isLoading}
						{...register('album')}
						data-testid='input-album'
					/>

					<Input
						id='coverImage'
						placeholder='Cover image URL (optional)'
						disabled={isLoading}
						{...register('coverImage')}
						data-testid='input-cover-image'
					/>

					{/* Genre Input */}
					<div className='flex items-center gap-2'>
						<Select
							value={selectedGenreId}
							onValueChange={(value) => {
								setSelectedGenreId(value)
								handleAddGenre(value)
							}}
							disabled={isLoading}
							data-testid='genre-selector'
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select genre (optional)' />
							</SelectTrigger>

							<SelectContent>
								{availableGenres
									.filter((g) => !selectedGenres.includes(g))
									.map((genre) => (
										<SelectItem key={genre} value={genre}>
											{genre}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className='flex flex-wrap gap-2'>
						{selectedGenres.map((genre) => (
							<div key={genre} className='flex items-center rounded-full bg-muted px-3 py-1 text-sm'>
								<span>{genre}</span>

								<button
									type='button'
									onClick={() => removeGenre(genre)}
									className='ml-2 cursor-pointer text-red-500 hover:text-red-700'
								>
									×
								</button>
							</div>
						))}
					</div>

					<Button
						variant='default'
						size='lg'
						disabled={isLoading}
						type='submit'
						className='cursor-pointer'
						data-testid='submit-button'
					>
						Create
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
