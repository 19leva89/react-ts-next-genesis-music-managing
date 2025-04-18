import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props {
	children: ReactNode
	className?: string
}

export const Box = ({ children, className }: Props) => {
	return <div className={cn(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>{children}</div>
}
