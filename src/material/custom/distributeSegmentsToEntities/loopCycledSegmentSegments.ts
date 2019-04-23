import { Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, Cycle, notAs, Ordinal, use } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters, LoopSegmentCycleShift } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal<LoopSegmentCycleShift[]>,
    loopSegmentCycleShift: LoopSegmentCycleShift,
    segments: Segment[],
}) => Segment[] =
    ({ loopSegmentCycleShift, segments, loopIndex }: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const loopCycling: Cardinal<Cycle<Note[]>> = use.Multiple(
            loopSegmentCycleShift,
            as.Multiple<Cardinal<Cycle<Note[]>>>(notAs.Ordinal<LoopSegmentCycleShift[]>(loopIndex)),
        )

        return segments.map((segment: Segment) => notAs.Cycle(use.Cardinal(
            as.Cycle(segment),
            loopCycling,
        )))
    }

export {
    computeLoopCycledSegmentSegments,
}
