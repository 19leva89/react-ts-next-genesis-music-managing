import { getAllTracks } from '@/app/actions'
import { Header, ListItem } from '@/components/shared'
import { TrackFilters } from './_components/track-filters'
import { TrackListWrapper } from './_components/track-list-wrapper'
import { PaginationClient } from '@/components/shared/pagination-client'

export const revalidate = 0

type Props = {
	searchParams: Promise<{
		page?: string
		sort?: string
		order?: 'asc' | 'desc'
		search?: string
		genre?: string
		artist?: string
	}>
}

const HomePage = async ({ searchParams }: Props) => {
	const params = await searchParams

	const currentPage = Number(params?.page || 1)
	const sortField = params?.sort || 'createdAt'
	const sortOrder = params?.order || 'desc'
	const searchQuery = params?.search || ''
	const sortGenre = params?.genre || ''
	const sortArtist = params?.artist || ''

	const { data: tracks, meta } = await getAllTracks({
		page: currentPage,
		limit: 16,
		sort: sortField,
		order: sortOrder,
		search: searchQuery,
		genre: sortGenre,
		artist: sortArtist,
	})

	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header>
				<div className="mb-2">
					<h1 className="text-white text-3xl font-semibold">Welcome Back</h1>

					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
						<ListItem image="/img/liked.png" name="Liked Tracks" href="liked" />
					</div>
				</div>
			</Header>

			<div className="mt-2 mb-7 px-6">
				<div className="flex flex-wrap justify-between items-center gap-4">
					<h1 className="text-white text-2xl font-semibold">Newest Tracks</h1>

					<TrackFilters
						sortField={sortField}
						sortOrder={sortOrder}
						searchQuery={searchQuery}
						sortGenre={sortGenre}
					/>
				</div>
			</div>

			<TrackListWrapper tracks={tracks} />

			<div className="m-6">
				<PaginationClient currentPage={meta.page} totalPages={meta.totalPages} />
			</div>
		</div>
	)
}

export default HomePage
