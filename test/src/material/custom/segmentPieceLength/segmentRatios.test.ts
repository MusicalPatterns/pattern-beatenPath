import { as, Fraction } from '@musical-patterns/utilities'
import { computeSegmentRatios } from '../../../../../src/indexForTest'

describe('segment ratios', () => {
    it(
        `computes the set of ratios for the segment by sequentially multiplying the intervals for the segment, \
always treating one of them as the base ratio of 1`,
        () => {
            const segmentRatios: Fraction[] = computeSegmentRatios({
                segmentIntervals: [
                    as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                    as.Fraction([ as.Numerator(4), as.Denominator(3) ]),
                ],
            })

            expect(segmentRatios)
                .toEqual([
                    as.Fraction([ as.Numerator(1), as.Denominator(1) ]),
                    as.Fraction([ as.Numerator(4), as.Denominator(5) ]),
                    as.Fraction([ as.Numerator(16), as.Denominator(15) ]),
                ])
        },
    )
})
