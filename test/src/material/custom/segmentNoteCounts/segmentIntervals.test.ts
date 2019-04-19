import { Entity, Segment } from '@musical-patterns/material'
import { Fraction, to } from '@musical-patterns/utilities'
import { computeSegmentIntervals } from '../../../../../src/indexForTest'

describe('segment intervals', () => {
    it('selects a number of intervals from the core intervals equal to the entity count minus one, starting at the segment index', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
            ]),
            entityCount: to.Cardinal<Entity>(3),
            segmentIndex: to.Ordinal<Segment>(0),
        })

        expect(segmentIntervals)
            .toEqual([
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
            ])

    })

    it('works for entity counts greater than 2', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
            ]),
            entityCount: to.Cardinal<Entity>(4),
            segmentIndex: to.Ordinal<Segment>(0),
        })

        expect(segmentIntervals)
            .toEqual([
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
            ])

    })

    it('works for segment indices other than 0', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
            ]),
            entityCount: to.Cardinal<Entity>(3),
            segmentIndex: to.Ordinal<Segment>(1),
        })

        expect(segmentIntervals)
            .toEqual([
                to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
            ])
    })
})
