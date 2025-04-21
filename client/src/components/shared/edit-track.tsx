import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
} from '@/components/ui'
import { Track } from '@/app/types'
import { PlusIcon } from 'lucide-react'

interface Props {
	track: Track
	isOpen: boolean
	onClose: () => void
}

export const EditTrack = ({ track, isOpen, onClose }: Props) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="rounded-xl sm:max-w-2xl max-[450px]:px-1">
				<DialogHeader className="px-4">
					<DialogTitle>Edit</DialogTitle>

					<DialogDescription>Update values of {track.title} in your library</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 py-4">
					<div className="flex items-center justify-start gap-4 px-4">
						<div className="w-[20%]">Sell price</div>

						<Input
							id="sell-price"
							type="number"
							min={0}
							step={0.01}
							value={''}
							autoFocus={false}
							onChange={() => {}}
							className="w-[80%] rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
					</div>

					{/* Section for displaying transactions and sales */}
					<div className="mt-2">
						<div className="flex items-center justify-between mb-1">
							<h3 className="px-4 text-lg font-semibold max-[400px]:text-sm">Transaction History</h3>

							<div className="flex flex-col px-4 max-[600px]:text-sm">
								<p className="">Total invested</p>

								<p className="">Total value: </p>
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="flex-row justify-end gap-3 px-4">
					<Button
						variant="outline"
						size="default"
						onClick={() => {}}
						disabled={false}
						className="rounded-xl transition-colors ease-in-out duration-300"
					>
						<PlusIcon className="size-4" />
						<span>Transaction</span>
					</Button>

					<Button
						variant="default"
						size="default"
						onClick={() => {}}
						disabled={false}
						className="rounded-xl text-white transition-colors ease-in-out duration-300"
					>
						<span>Save changes</span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
