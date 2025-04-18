import { forwardRef, InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
	({ className, type, disabled, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
					className,
				)}
				type={type}
				disabled={disabled}
				ref={ref}
				{...props}
			/>
		)
	},
)

Input.displayName = 'Input'
