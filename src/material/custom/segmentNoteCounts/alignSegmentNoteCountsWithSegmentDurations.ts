import { apply, Cardinal, insteadOf, min, negative, ofFrom, Ordinal, Scalar, to } from '@musical-patterns/utilities'
import { AlignSegmentNoteCountsWithSegmentDurationsParameters } from './types'

const alignSegmentNoteCountsWithSegmentDurations:
    (parameters: { segmentDurationIndices: Array<Ordinal<Scalar>>, segmentNoteCounts: Cardinal[] }) => Cardinal[] =
    (
        {
            segmentNoteCounts,
            segmentDurationIndices,
        }: AlignSegmentNoteCountsWithSegmentDurationsParameters,
    ): Cardinal[] => {
        const leastSegmentDurationIndex: Ordinal<Scalar> = min(...segmentDurationIndices)
        const segmentNoteCountsIndices: Array<Ordinal<Cardinal>> = segmentDurationIndices.map(
            (segmentDurationIndex: Ordinal<Scalar>) =>
                insteadOf<Ordinal, Cardinal>(apply.Translation(
                    segmentDurationIndex,
                    to.Translation(ofFrom(negative(leastSegmentDurationIndex))),
                )),
        )

        return segmentNoteCountsIndices.map((segmentNoteCountsIndex: Ordinal<Cardinal>) =>
            apply.Ordinal(segmentNoteCounts, segmentNoteCountsIndex),
        )
    }

export {
    alignSegmentNoteCountsWithSegmentDurations,
}
