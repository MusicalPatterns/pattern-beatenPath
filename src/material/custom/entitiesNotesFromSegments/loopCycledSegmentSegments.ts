import { Segment } from '@musical-patterns/pattern'
import { apply, from, to, Translation } from '@musical-patterns/utilities'
import { ComputeLoopCycledSegmentSegmentsParameters } from './types'

const computeLoopCycledSegmentSegments: (parameters: ComputeLoopCycledSegmentSegmentsParameters) => Segment[] =
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
