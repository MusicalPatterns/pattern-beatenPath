import { Segment } from '@musical-patterns/pattern'
import { apply, from, Ordinal, to, Translation } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters } from './types'

const computeLoopCycledSegmentSegments: (parameters: {
    loopIndex: Ordinal,
    loopSegmentCycleTranslations: Translation,
    segments: Segment[],
}) => Segment[] =
    (parameters: ComputeLoopCycledSegmentSegmentsParameters): Segment[] => {
        const { loopSegmentCycleTranslations, segments, loopIndex } = parameters

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
