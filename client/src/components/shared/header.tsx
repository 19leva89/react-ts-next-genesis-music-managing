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
		<div className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)} data-testid='header'>
			<div className='mb-4 flex w-full items-center justify-between'>
				<div className='hidden items-center gap-x-2 md:flex' data-testid='nav-buttons-desktop'>
					<Button
						variant='default'
						size='icon'
						onClick={() => router.back()}
						className='cursor-pointer rounded-full bg-black transition duration-300 ease-in-out hover:opacity-75'
						data-testid='button-back'
					>
						<ChevronLeftIcon size={35} className='size-6 text-white' />
					</Button>

					<Button
						variant='default'
						size='icon'
						onClick={() => router.forward()}
						className='cursor-pointer rounded-full bg-black transition duration-300 ease-in-out hover:opacity-75'
						data-testid='button-forward'
					>
						<ChevronRightIcon size={35} className='size-6 text-white' />
					</Button>
				</div>

				<div className='flex items-center gap-x-2 md:hidden' data-testid='nav-buttons-mobile'>
					<Button
						variant='secondary'
						size='icon'
						className='cursor-pointer rounded-full bg-white transition duration-300 ease-in-out hover:opacity-75'
						data-testid='button-home'
					>
						<HouseIcon size={20} className='size-5 text-black' />
					</Button>

					<Button
						variant='secondary'
						size='icon'
						className='cursor-pointer rounded-full bg-white transition duration-300 ease-in-out hover:opacity-75'
						data-testid='button-search'
					>
						<SearchIcon size={20} className='size-5 text-black' />
					</Button>
				</div>

				<div className='flex items-center justify-between gap-x-4' data-testid='auth-buttons'>
					<Button
						variant='ghost'
						size='lg'
						onClick={() => {}}
						className='cursor-pointer rounded-xl transition duration-300 ease-in-out'
						data-testid='button-sign-up'
					>
						Sign Up
					</Button>

					<Button
						variant='outline'
						size='lg'
						onClick={() => {}}
						className='cursor-pointer rounded-xl transition duration-300 ease-in-out'
						data-testid='button-log-in'
					>
						Log In
					</Button>
				</div>
			</div>

			{children}
		</div>
	)
}
