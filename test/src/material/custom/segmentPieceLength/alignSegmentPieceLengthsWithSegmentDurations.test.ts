import { PitchDuration } from '@musical-patterns/material'
import { as, ContourPiece, Ordinal, Scalar } from '@musical-patterns/utilities'
import { alignSegmentPieceLengthsWithSegmentDurations, PieceLength } from '../../../../../src/indexForTest'

describe('align segment piece lengths with segment durations', () => {
    it(
        `makes sure, within a segment, that each entity gets assigned the piece length which matches the duration it got assigned \
(so that all together they make a polyrhythm within each segment) - \
the idea is that the entity with the highest duration index is the furthest through the core durations at this segment, \
so it needs to use the duration for the segment which is furthest through the core duration`,
        () => {
            const segmentPieceLengths: PieceLength[] = [ 15, 12, 16 ] // In order
                .map((actual: number) => as.Cardinal<ContourPiece<PitchDuration>>(actual))
            const segmentDurationIndices: Array<Ordinal<Scalar[]>> = [ 2, 4, 3 ].map((numeral: number) => as.Ordinal<Scalar[]>(numeral)) // Ground to 0, 2, 1

            const actualSegmentPieceLengthsAlignedWithSegmentDurations: PieceLength[] =
                alignSegmentPieceLengthsWithSegmentDurations({
                    segmentDurationIndices,
                    segmentPieceLengths,
                })

            expect(actualSegmentPieceLengthsAlignedWithSegmentDurations)
                .toEqual(
                    [ 15, 16, 12 ] // 0 takes index 0, 2 takes index 2, 1 takes index 1
                        .map((expected: number) => as.Cardinal<ContourPiece<PitchDuration>>(expected)),
                )
        },
    )
})
