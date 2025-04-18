'use client'

import { MyUserContextProvider } from '@/hooks/useUser'

interface UserProviderProps {
	children:  ReactNode
}

const UserProvider <UserProviderProps> = ({ children }) => {
	return <MyUserContextProvider>{children}</MyUserContextProvider>
}

export default UserProvider
