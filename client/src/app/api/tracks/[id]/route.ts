import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { BACKEND_URL } from '@/lib/constants'

interface Props {
	params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {
	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json({ error: 'Track ID is required' }, { status: 400 })
		}

		const url = `${BACKEND_URL}/tracks/${id}`

		const { data } = await axios.delete(url)

		return NextResponse.json(data)
	} catch (error: any) {
		const message = error.response?.data || error.message || 'Internal Server Error'
		const status = error.response?.status || 500
		return NextResponse.json({ error: message }, { status })
	}
}
