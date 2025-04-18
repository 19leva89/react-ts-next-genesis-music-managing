import Link from 'next/link'
import { IconType } from 'react-icons'

import { cn } from '@/lib/utils'

interface Props {
	icon: IconType
	label: string
	active?: boolean
	href: string
}

export const SidebarItem = ({ icon: Icon, label, active, href }: Props) => {
	return (
		<Link
			href={href}
			className={cn(
				`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
				active && 'text-white',
			)}
		>
			<Icon size={26} />
			<p className="truncate w-full">{label}</p>
		</Link>
	)
}
