// tslint:disable comment-format

import { Entity, Segment } from '@musical-patterns/material'
import { as, Cardinal, Scalar } from '@musical-patterns/utilities'
import { computeSegmentNoteCounts } from '../../../../../src/indexForTest'

describe('segment note counts', () => {
    describe('when entity count is 2', () => {
        it(
            `given that the entities in this segment are going to be playing notes of duration in proportion to each other \
by a subsequence of intervals from the core cycle, find that subsequence and then from it determine \
the ratios each of the durations will be in with each other duration, and from that determine \
the fewest number of notes each entity will have to play before they make a single polyrhythm and all line up again. \
this is an integration test of sorts - for more details look at: \
computeSegmentIntervals, computeSegmentRatios, computeSegmentNoteCountsFromSegmentRatios, and alignSegmentNoteCountsWithSegmentDurations`,
            () => {
                const segmentNoteCounts: Cardinal[] = computeSegmentNoteCounts({
                    coreIntervals: as.Cycle([
                        as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                        as.Fraction([ as.Numerator(4), as.Denominator(3) ]),
                    ]),
                    entityCount: as.Cardinal<Entity>(2),
                    segmentDurationIndices: [ 1, 0 ].map((value: number) => as.Ordinal<Scalar>(value)),
                    segmentIndex: as.Ordinal<Segment>(0),
                })

                // # Step 1: computeSegmentIntervals
                // [ as.Fraction([ as.Numerator(4), as.Denominator(5) ]) ]

                // # Step 2: computeSegmentRatios
                // [
                //      as.Fraction([ as.Numerator(1), as.Denominator(1) ]),
                //      as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                // ]

                // # Step 3: computeSegmentNoteCountsFromSegmentRatios
                // [ 4, 5 ].map(as.Cardinal)

                // # Step 4: alignSegmentNoteCountsWithSegmentDurations
                // [ 5, 4 ].map(as.Cardinal)

                expect(segmentNoteCounts)
                    .toEqual([ 5, 4 ].map(as.Cardinal))
            },
        )
    })

    describe('when entity count is 3', () => {
        it(
            `given that the entities in this segment are going to be playing notes of duration in proportion to each other \
by a subsequence of intervals from the core cycle, find that subsequence and then from it determine \
the ratios each of the durations will be in with each other duration, and from that determine \
the fewest number of notes each entity will have to play before they make a single polyrhythm and all line up again. \
this is an integration test of sorts - for more details look at: \
computeSegmentIntervals, computeSegmentRatios, computeSegmentNoteCountsFromSegmentRatios, and alignSegmentNoteCountsWithSegmentDurations`,
            () => {
                const segmentNoteCounts: Cardinal[] = computeSegmentNoteCounts({
                    coreIntervals: as.Cycle([
                        as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                        as.Fraction([ as.Numerator(4), as.Denominator(3) ]),
                        as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                    ]),
                    entityCount: as.Cardinal<Entity>(3),
                    segmentDurationIndices: [ 2, 1, 0 ].map((value: number) => as.Ordinal<Scalar>(value)),
                    segmentIndex: as.Ordinal<Segment>(0),
                })

                // # Step 1: computeSegmentIntervals
                // [
                //      as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                //      as.Fraction([ as.Numerator(4), as.Denominator(3) ]),
                // ]

                // # Step 2: computeSegmentRatios
                // [
                //      as.Fraction([ as.Numerator(1), as.Denominator(1) ]),
                //      as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                //      as.Fraction([ as.Numerator(16), as.Denominator(15) ]),
                // ]

                // # Step 3: computeSegmentNoteCountsFromSegmentRatios
                // [ 16, 20, 15 ].map(as.Cardinal)

                // # Step 4: alignSegmentNoteCountsWithSegmentDurations
                // [ 15, 20, 16 ].map(as.Cardinal)

                expect(segmentNoteCounts)
                    .toEqual([ 15, 20, 16 ].map(as.Cardinal))
            },
        )
    })
})
