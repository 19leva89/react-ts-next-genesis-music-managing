'use client'

import { Track } from '@/app/types'
import { BulkDelete } from './bulk-delete'
import { PageContent } from './page-content'
import { useTrackSelection } from '@/hooks/use-track-selection'

type Props = {
	tracks: Track[]
}

export const TrackListWrapper = ({ tracks }: Props) => {
	const { isSelecting, selectedIds, isSelected, toggleTrack, toggleAll, clear, toggleSelecting } =
		useTrackSelection()

	return (
		<>
			<PageContent tracks={tracks} isSelecting={isSelecting} isSelected={isSelected} onSelect={toggleTrack} />

			<div className="flex items-center gap-x-2 mb-4">
				<BulkDelete
					allTrackIds={tracks.map((t) => t.id)}
					selectedIds={selectedIds}
					clear={clear}
					toggleAll={toggleAll}
					toggleSelecting={toggleSelecting}
					isSelecting={isSelecting}
				/>
			</div>
		</>
	)
}
