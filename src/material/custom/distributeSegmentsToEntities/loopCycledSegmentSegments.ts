import { Note, Segment } from '@musical-patterns/material'
import { as, Cycle, notAs, Ordinal, Translation, use } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters, LoopSegmentCycleTranslation } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal<LoopSegmentCycleTranslation>,
    loopSegmentCycleTranslation: LoopSegmentCycleTranslation,
    segments: Segment[],
}) => Segment[] =
    ({ loopSegmentCycleTranslation, segments, loopIndex }: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const loopTranslation: Translation<Cycle<Note[]>> = use.Scalar(
            loopSegmentCycleTranslation,
            as.Scalar<Translation<Cycle<Note[]>>>(notAs.Ordinal(loopIndex)),
        )

        return segments.map((segment: Segment) => notAs.Cycle(use.Translation(
            as.Cycle(segment),
            loopTranslation,
        )))
    }

export {
    computeLoopCycledSegmentSegments,
}
