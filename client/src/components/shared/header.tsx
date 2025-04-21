'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon, HouseIcon, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { usePlayer } from '@/hooks/use-player'

interface Props {
	children: ReactNode
	className?: string
}

export const Header = ({ children, className }: Props) => {
	const player = usePlayer()

	const router = useRouter()

	return (
		<div className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
			<div className="w-full mb-4 justify-between flex items-center">
				<div className="hidden md:flex gap-x-2 items-center">
					<Button
						variant="default"
						size="icon"
						onClick={() => router.back()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<ChevronLeftIcon size={35} className="size-6 text-white" />
					</Button>

					<Button
						variant="default"
						size="icon"
						onClick={() => router.forward()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<ChevronRightIcon size={35} className="size-6 text-white" />
					</Button>
				</div>

				<div className="flex items-center gap-x-2 md:hidden">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<HouseIcon size={20} className="size-5 text-black" />
					</Button>

					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
					>
						<SearchIcon size={20} className="size-5 text-black" />
					</Button>
				</div>

				<div className="flex justify-between items-center gap-x-4">
					<Button
						variant="ghost"
						size="lg"
						onClick={() => {}}
						className="rounded-xl cursor-pointer transition ease-in-out duration-300"
					>
						Sign Up
					</Button>

					<Button
						variant="outline"
						size="lg"
						onClick={() => {}}
						className="rounded-xl cursor-pointer transition ease-in-out duration-300"
					>
						Log In
					</Button>
				</div>
			</div>

			{children}
		</div>
	)
}
