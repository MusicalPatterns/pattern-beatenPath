import { Fraction, to } from '@musical-patterns/utilities'
import { computeSegmentIntervals } from '../../../../../src/indexForTest'

describe('segment intervals', () => {
    it('selects a number of intervals from the core intervals equal to the entity count minus one, starting at the segment index', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
            ]),
            entityCount: to.Cardinal(3),
            segmentIndex: to.Ordinal(0),
        })

        expect(segmentIntervals)
            .toEqual([ to.Fraction([ 4, 5 ]), to.Fraction([ 4, 3 ]) ])

    })

    it('works for entity counts greater than 2', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
            ]),
            entityCount: to.Cardinal(4),
            segmentIndex: to.Ordinal(0),
        })

        expect(segmentIntervals)
            .toEqual([ to.Fraction([ 4, 5 ]), to.Fraction([ 4, 3 ]), to.Fraction([ 4, 5 ]) ])

    })

    it('works for segment indices other than 0', () => {
        const segmentIntervals: Fraction[] = computeSegmentIntervals({
            coreIntervals: to.Cycle([
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
                to.Fraction([ 4, 5 ]),
                to.Fraction([ 4, 3 ]),
            ]),
            entityCount: to.Cardinal(3),
            segmentIndex: to.Ordinal(1),
        })

        expect(segmentIntervals)
            .toEqual([ to.Fraction([ 4, 3 ]), to.Fraction([ 4, 5 ]) ])
    })
})
