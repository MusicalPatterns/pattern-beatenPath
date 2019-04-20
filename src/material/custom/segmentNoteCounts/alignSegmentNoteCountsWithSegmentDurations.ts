import { as, Cardinal, insteadOf, min, negative, ofNotAs, Ordinal, Scalar, use } from '@musical-patterns/utilities'
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
                insteadOf<Ordinal, Cardinal>(use.Translation(
                    segmentDurationIndex,
                    as.Translation(ofNotAs(negative(leastSegmentDurationIndex))),
                )),
        )

        return segmentNoteCountsIndices.map((segmentNoteCountsIndex: Ordinal<Cardinal>) =>
            use.Ordinal(segmentNoteCounts, segmentNoteCountsIndex),
        )
    }

export {
    alignSegmentNoteCountsWithSegmentDurations,
}
