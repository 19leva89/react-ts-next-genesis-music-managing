'use client'

import useDebounce from '@/src/hooks/use-debounce'
import Input from './input'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from 'query-string'

export const SearchInput = () => {
	const router = useRouter()
	const [value, setValue] = useState<string>('')
	const debounceValue = useDebounce<string>(value, 500)

	useEffect(() => {
		const query = {
			title: debounceValue,
		}

		const url = qs.stringifyUrl({
			url: '/search',
			query: query,
		})

		router.push(url)
	}, [debounceValue, router])

	return (
		<Input
			placeholder="What do you want to listen to?"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}
