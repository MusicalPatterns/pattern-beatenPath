// tslint:disable comment-format

import { Segment } from '@musical-patterns/material'
import { Cardinal, Scalar, to } from '@musical-patterns/utilities'
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
                    coreIntervals: to.Cycle([
                        to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                        to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                    ]),
                    entityCount: to.Cardinal(2),
                    segmentDurationIndices: [ 1, 0 ].map((value: number) => to.Ordinal<Scalar>(value)),
                    segmentIndex: to.Ordinal<Segment>(0),
                })

                // # Step 1: computeSegmentIntervals
                // [ to.Fraction([ to.Numerator(4), to.Denominator(5) ]) ]

                // # Step 2: computeSegmentRatios
                // [
                //      to.Fraction([ to.Numerator(1), to.Denominator(1) ]),
                //      to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                // ]

                // # Step 3: computeSegmentNoteCountsFromSegmentRatios
                // [ 4, 5 ].map(to.Cardinal)

                // # Step 4: alignSegmentNoteCountsWithSegmentDurations
                // [ 5, 4 ].map(to.Cardinal)

                expect(segmentNoteCounts)
                    .toEqual([ 5, 4 ].map(to.Cardinal))
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
                    coreIntervals: to.Cycle([
                        to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                        to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                        to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                    ]),
                    entityCount: to.Cardinal(3),
                    segmentDurationIndices: [ 2, 1, 0 ].map((value: number) => to.Ordinal<Scalar>(value)),
                    segmentIndex: to.Ordinal<Segment>(0),
                })

                // # Step 1: computeSegmentIntervals
                // [
                //      to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                //      to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                // ]

                // # Step 2: computeSegmentRatios
                // [
                //      to.Fraction([ to.Numerator(1), to.Denominator(1) ]),
                //      to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                //      to.Fraction([ to.Numerator(16), to.Denominator(15) ]),
                // ]

                // # Step 3: computeSegmentNoteCountsFromSegmentRatios
                // [ 16, 20, 15 ].map(to.Cardinal)

                // # Step 4: alignSegmentNoteCountsWithSegmentDurations
                // [ 15, 20, 16 ].map(to.Cardinal)

                expect(segmentNoteCounts)
                    .toEqual([ 15, 20, 16 ].map(to.Cardinal))
            },
        )
    })
})
