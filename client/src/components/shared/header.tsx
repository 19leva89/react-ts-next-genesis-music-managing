'use client'

import { toast } from 'sonner'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import { cn } from '@/lib/utils'
import { usePlayer } from '@/hooks/use-player'
import { Button } from '@/components/shared/button'
import { useAuthModal } from '@/hooks/use-auth-modal'

interface Props {
	children: ReactNode
	className?: string
}

export const Header = ({ children, className }: Props) => {
	const player = usePlayer()
	const authModal = useAuthModal()
	const router = useRouter()

	// const supabaseClient = useSupabaseClient()

	const handleLogout = async () => {
		// const { error } = await supabaseClient.auth.signOut()
		player.reset()
		router.refresh()

		// if (error) toast.error(error.message)
		toast.success('Logged Out!')
	}

	return (
		<div className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
			<div className="w-full mb-4 justify-between flex items-center">
				<div className="hidden md:flex gap-x-2 items-center">
					<button
						onClick={() => router.back()}
						className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
					>
						<RxCaretLeft size={35} className="text-white" />
					</button>
					<button
						onClick={() => router.forward()}
						className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
					>
						<RxCaretRight size={35} className="text-white" />
					</button>
				</div>

				<div className="flex md:hidden gap-x-2 items-center">
					<button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
						<HiHome size={20} className="text-black" />
					</button>
					<button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
						<BiSearch size={20} className="text-black" />
					</button>
				</div>

				<div className="flex justify-between items-center gap-x-4">
					<div>
						<Button onClick={authModal.onOpen} className="bg-transparent text-neutral-300 font-medium">
							Sign Up
						</Button>
					</div>

					<div>
						<Button onClick={authModal.onOpen} className="bg-white px-6 py-2">
							Log In
						</Button>
					</div>
				</div>
			</div>
			{children}
		</div>
	)
}
