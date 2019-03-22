import { Cardinal, Ordinal, to } from '@musical-patterns/utilities'
import { alignSegmentNoteCountsWithSegmentDurations } from '../../../../../src/indexForTest'

describe('align segment note counts with segment durations', () => {
    it(
        `makes sure each entity gets assigned the note count for the segment which matches the scalar it got assigned \
(so that they make a polyrhythm within each segment) - \
the idea is that the entity with the highest duration index is the furthest through the core scalars at this segment, \
so it needs to use the scalar for the segment which is furthest through the core scalars`,
        () => {
            const segmentNoteCounts: Cardinal[] = [ 15, 12, 16 ].map(to.Ordinal)
            const segmentDurationIndices: Ordinal[] = [ 2, 4, 3 ].map(to.Ordinal)

            const actualSegmentNoteCountsAlignedWithSegmentDurations: Cardinal[] =
                alignSegmentNoteCountsWithSegmentDurations({
                    segmentDurationIndices,
                    segmentNoteCounts,
                })

            expect(actualSegmentNoteCountsAlignedWithSegmentDurations)
                .toEqual([ 15, 16, 12 ].map(to.Ordinal))
        },
    )
})
