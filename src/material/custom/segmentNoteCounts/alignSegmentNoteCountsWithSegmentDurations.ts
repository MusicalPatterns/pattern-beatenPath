import { apply, Cardinal, difference, min, Ordinal } from '@musical-patterns/utilities'
import { AlignSegmentNoteCountsWithSegmentDurationsParameters } from './types'

const alignSegmentNoteCountsWithSegmentDurations:
    (parameters: AlignSegmentNoteCountsWithSegmentDurationsParameters) => Cardinal[] =
    (parameters: AlignSegmentNoteCountsWithSegmentDurationsParameters): Cardinal[] => {
        const { segmentNoteCounts, segmentDurationIndices } = parameters

        const leastSegmentDurationIndex: Ordinal = min(...segmentDurationIndices)
        const segmentNoteCountsIndices: Ordinal[] = segmentDurationIndices.map(
            (segmentDurationIndex: Ordinal) =>
                difference(segmentDurationIndex, leastSegmentDurationIndex),
        )

        return segmentNoteCountsIndices.map((segmentNoteCountsIndex: Ordinal) =>
            apply.Ordinal(segmentNoteCounts, segmentNoteCountsIndex),
        )
    }

export {
    alignSegmentNoteCountsWithSegmentDurations,
}
