import { Cardinal, Ordinal, to } from '@musical-patterns/utilities'
import { alignSegmentNoteCountsWithSegmentDurations } from '../../../../../src/indexForTest'

describe('align segment note counts with segment durations', () => {
    it(
        `makes sure, within a segment, that each entity gets assigned the note count which matches the duration it got assigned \
(so that all together they make a polyrhythm within each segment) - \
the idea is that the entity with the highest duration index is the furthest through the core durations at this segment, \
so it needs to use the duration for the segment which is furthest through the core duration`,
        () => {
            const segmentNoteCounts: Cardinal[] = [ 15, 12, 16 ].map(to.Cardinal) // In order
            const segmentDurationIndices: Ordinal[] = [ 2, 4, 3 ].map(to.Ordinal) // Ground to 0, 2, 1

            const actualSegmentNoteCountsAlignedWithSegmentDurations: Cardinal[] =
                alignSegmentNoteCountsWithSegmentDurations({
                    segmentDurationIndices,
                    segmentNoteCounts,
                })

            expect(actualSegmentNoteCountsAlignedWithSegmentDurations)
                .toEqual([ 15, 16, 12 ].map(to.Cardinal)) // 0 takes index 0, 2 takes index 2, 1 takes index 1
        },
    )
})
