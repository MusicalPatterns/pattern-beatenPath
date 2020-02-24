import { asRational, Rational } from '@musical-patterns/utilities'
import { computeSegmentRatios } from '../../../../../src/indexForTest'

describe('segment ratios', (): void => {
    it(
        `computes the set of ratios for the segment by sequentially multiplying the intervals for the segment, \
always treating one of them as the base ratio of 1`,
        (): void => {
            const segmentRatios: Rational[] = computeSegmentRatios({
                segmentIntervals: [
                    asRational(4, 5),
                    asRational(4, 3),
                ],
            })

            expect(segmentRatios)
                .toEqual([
                    asRational(1, 1),
                    asRational(4, 5),
                    asRational(16, 15),
                ])
        },
    )
})
