import { Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, Cycle,  Ordinal, use } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters, LoopSegmentCycleShift } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal<LoopSegmentCycleShift[]>,
    loopSegmentCycleShift: LoopSegmentCycleShift,
    segments: Segment[],
}) => Segment[] =
    ({ loopSegmentCycleShift, segments, loopIndex }: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const loopCycling: Cardinal<Cycle<Note[]>> = use.Multiple(
            loopSegmentCycleShift,
            as.Multiple<Cardinal<Cycle<Note[]>>>(as.number(loopIndex)),
        )

        return segments.map((segment: Segment): Segment => {
            const cycle: Cycle<Note[]> = use.Cardinal(
                as.Cycle(segment),
                loopCycling,
            )

            delete cycle._CycleBrand

            return cycle
        })
    }

export {
    computeLoopCycledSegmentSegments,
}
