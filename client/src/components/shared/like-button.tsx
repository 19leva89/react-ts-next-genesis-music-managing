'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useAuthModal } from '@/hooks/use-auth-modal'

interface Props {
	songId: string
}

export const LikeButton = ({ songId }: Props) => {
	const router = useRouter()
	// const { supabaseClient } = useSessionContext()

	const authModal = useAuthModal()
	// const { user } = useUser()

	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		// if (!user?.id) return

		const fetchData = async () => {
			// const { data, error } = await supabaseClient
			// 	.from('liked_songs')
			// 	.select('*')
			// 	.eq('user_id', user.id)
			// 	.eq('song_id', songId)
			// 	.single()
			// if (!error && data) setIsLiked(true)
		}

		fetchData()
	}, [songId])

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart

	const handleLike = async () => {
		// if (!user) return authModal.onOpen()

		// if (isLiked) {
		// 	const { error } = await supabaseClient
		// 		.from('liked_songs')
		// 		.delete()
		// 		.eq('user_id', user.id)
		// 		.eq('song_id', songId)

		// 	if (error) {
		// 		console.error(error)
		// 		toast.error(error.message)
		// 	} else {
		// 		setIsLiked(false)
		// 	}
		// } else {
		// 	const { error } = await supabaseClient.from('liked_songs').insert({
		// 		song_id: songId,
		// 		user_id: user.id,
		// 	})

		setIsLiked(true)
		toast.success('Liked Song!')

		router.refresh()
	}

	return (
		<button className="hover:opacity-75 transition" onClick={handleLike}>
			<Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
		</button>
	)
}
