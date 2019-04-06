import { Cardinal, Fraction, to } from '@musical-patterns/utilities'
import { computeSegmentNoteCountsFromSegmentRatios } from '../../../../../src/indexForTest'

describe('segment note counts from segment ratios', () => {
    it(
        `puts them into common terms then maps them to their numerators \
which represents the total length of the segment in units that each of the durations can be expressed wholly in \
then divides its numerator by that number to give you your notes count`,
        () => {
            // 15 * 12 * 16 = 240
            const segmentRatios: Fraction[] = [
                to.Fraction([ to.Numerator(1), to.Denominator(1) ]),      // 15/15 -> 240 / 15 -> 16
                to.Fraction([ to.Numerator(4), to.Denominator(5) ]),      // 12/15 -> 240 / 12 -> 20
                to.Fraction([ to.Numerator(16), to.Denominator(15) ]),    // 16/15 -> 240 / 16 -> 15
            ]
            const actualSegmentNoteCounts: Cardinal[] =
                computeSegmentNoteCountsFromSegmentRatios(segmentRatios)

            expect(actualSegmentNoteCounts)
                .toEqual([ 16, 20, 15 ].map(to.Cardinal))
        },
    )
})
