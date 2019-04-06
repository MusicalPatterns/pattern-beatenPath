import { Fraction, to } from '@musical-patterns/utilities'
import { computeSegmentRatios } from '../../../../../src/indexForTest'

describe('segment ratios', () => {
    it(
        `computes the set of ratios for the segment by sequentially multiplying the intervals for the segment, \
always treating one of them as the base ratio of 1`,
        () => {
            const segmentRatios: Fraction[] = computeSegmentRatios({
                segmentIntervals: [
                    to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                    to.Fraction([ to.Numerator(4), to.Denominator(3) ]),
                ],
            })

            expect(segmentRatios)
                .toEqual([
                    to.Fraction([ to.Numerator(1), to.Denominator(1) ]),
                    to.Fraction([ to.Numerator(4), to.Denominator(5) ]),
                    to.Fraction([ to.Numerator(16), to.Denominator(15) ]),
                ])
        },
    )
})
