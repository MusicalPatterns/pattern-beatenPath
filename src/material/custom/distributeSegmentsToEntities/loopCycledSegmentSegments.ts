import { Segment } from '@musical-patterns/material'
import { apply, from, Ordinal, to, Translation } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal,
    loopSegmentCycleTranslations: Translation,
    segments: Segment[],
}) => Segment[] =
    ({ loopSegmentCycleTranslations, segments, loopIndex }: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const loopTranslation: Translation = apply.Scalar(
            loopSegmentCycleTranslations,
            to.Scalar(from.Ordinal(loopIndex)),
        )

        return segments.map((segment: Segment) => from.Cycle(apply.Translation(
            to.Cycle(segment),
            loopTranslation),
        ))
    }

export {
    computeLoopCycledSegmentSegments,
}
