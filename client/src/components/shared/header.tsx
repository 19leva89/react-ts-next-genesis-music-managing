'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon, HouseIcon, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

interface Props {
	children: ReactNode
	className?: string
}

export const Header = ({ children, className }: Props) => {
	const router = useRouter()

	return (
		<div className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)} data-testid="header">
			<div className="w-full mb-4 justify-between flex items-center">
				<div className="hidden md:flex gap-x-2 items-center" data-testid="nav-buttons-desktop">
					<Button
						variant="default"
						size="icon"
						onClick={() => router.back()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
						data-testid="button-back"
					>
						<ChevronLeftIcon size={35} className="size-6 text-white" />
					</Button>

					<Button
						variant="default"
						size="icon"
						onClick={() => router.forward()}
						className="rounded-full bg-black cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
						data-testid="button-forward"
					>
						<ChevronRightIcon size={35} className="size-6 text-white" />
					</Button>
				</div>

				<div className="flex items-center gap-x-2 md:hidden" data-testid="nav-buttons-mobile">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
						data-testid="button-home"
					>
						<HouseIcon size={20} className="size-5 text-black" />
					</Button>

					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white cursor-pointer hover:opacity-75 transition ease-in-out duration-300"
						data-testid="button-search"
					>
						<SearchIcon size={20} className="size-5 text-black" />
					</Button>
				</div>

				<div className="flex justify-between items-center gap-x-4" data-testid="auth-buttons">
					<Button
						variant="ghost"
						size="lg"
						onClick={() => {}}
						className="rounded-xl cursor-pointer transition ease-in-out duration-300"
						data-testid="button-sign-up"
					>
						Sign Up
					</Button>

					<Button
						variant="outline"
						size="lg"
						onClick={() => {}}
						className="rounded-xl cursor-pointer transition ease-in-out duration-300"
						data-testid="button-log-in"
					>
						Log In
					</Button>
				</div>
			</div>

			{children}
		</div>
	)
}
