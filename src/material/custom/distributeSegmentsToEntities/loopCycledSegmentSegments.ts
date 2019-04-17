import { Note, Segment } from '@musical-patterns/material'
import { apply, Cycle, from, Ordinal, to, Translation } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters, LoopSegmentCycleTranslation } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal<LoopSegmentCycleTranslation>,
    loopSegmentCycleTranslation: LoopSegmentCycleTranslation,
    segments: Segment[],
}) => Segment[] =
    ({ loopSegmentCycleTranslation, segments, loopIndex }: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const loopTranslation: Translation<Cycle<Note[]>> = apply.Scalar(
            loopSegmentCycleTranslation,
            to.Scalar<Translation<Cycle<Note[]>>>(from.Ordinal(loopIndex)),
        )

        return segments.map((segment: Segment) => from.Cycle(apply.Translation(
            to.Cycle(segment),
            loopTranslation,
        )))
    }

export {
    computeLoopCycledSegmentSegments,
}
