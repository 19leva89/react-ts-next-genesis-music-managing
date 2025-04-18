'use client'

import { ReactNode, useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Database } from '@/types_db'

interface Props {
	children: ReactNode
}

export const SupabaseProvider = ({ children }: Props) => {
	const [supabaseClient] = useState(() => createClientComponentClient<Database>())

	return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
}
