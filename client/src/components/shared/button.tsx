import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
	({ className, children, disabled, type = 'button', ...props }, ref) => {
		return (
			<button
				type={type}
				className={cn(
					'w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition',
					className,
				)}
				disabled={disabled}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		)
	},
)

Button.displayName = 'Button'
