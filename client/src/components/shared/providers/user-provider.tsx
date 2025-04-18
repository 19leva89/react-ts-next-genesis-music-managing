'use client'

import { PropsWithChildren } from 'react'

import { MyUserContextProvider } from '@/hooks/use-user'

export const UserProvider = ({ children }: PropsWithChildren) => {
	return <MyUserContextProvider>{children}</MyUserContextProvider>
}
