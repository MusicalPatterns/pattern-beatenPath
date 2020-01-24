import { as, asFraction, Fraction } from '@musical-patterns/utilities'
import { computeSegmentRatios } from '../../../../../src/indexForTest'

describe('segment ratios', () => {
    it(
        `computes the set of ratios for the segment by sequentially multiplying the intervals for the segment, \
always treating one of them as the base ratio of 1`,
        () => {
            const segmentRatios: Fraction[] = computeSegmentRatios({
                segmentIntervals: [
                    asFraction(4, 5),
                    asFraction(4, 3),
                ],
            })

            expect(segmentRatios)
                .toEqual([
                    asFraction(1, 1),
                    asFraction(4, 5),
                    asFraction(16, 15),
                ])
        },
    )
})
