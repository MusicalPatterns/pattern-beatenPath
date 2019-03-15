import { Fraction, to } from '@musical-patterns/utilities'
import { computeSegmentRatios } from '../../../../../src/indexForTest'

describe('segment ratios', () => {
    it(
        `computes the set of ratios for the segment by sequentially multiplying the intervals for the segment, \
        always treating one of them as the base ratio of 1`,
        () => {
            const segmentRatios: Fraction[] = computeSegmentRatios({
                segmentIntervals: [ to.Fraction([ 4, 5 ]), to.Fraction([ 4, 3 ]) ],
            })

            expect(segmentRatios)
                .toEqual([
                    to.Fraction([ 1, 1 ]),
                    to.Fraction([ 4, 5 ]),
                    to.Fraction([ 16, 15 ]),
                ])
        },
    )
})
