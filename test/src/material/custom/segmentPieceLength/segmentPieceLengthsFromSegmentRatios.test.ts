import { PitchValue } from '@musical-patterns/material'
import { as, ContourPiece, Fraction } from '@musical-patterns/utilities'
import { computeSegmentPieceLengthsFromSegmentRatios, PieceLength } from '../../../../../src/indexForTest'

describe('segment piece lengths from segment ratios', () => {
    it(
        `puts them into common terms then maps them to their numerators \
which represents the total length of the segment in units that each of the values can be expressed wholly in \
then divides its numerator by that number to give you your notes count`,
        () => {
            // 15 * 12 * 16 = 240
            const segmentRatios: Fraction[] = [
                as.Fraction([ as.Numerator(1), as.Denominator(1) ]),      // 15/15 -> 240 / 15 -> 16
                as.Fraction([ as.Numerator(4), as.Denominator(5) ]),      // 12/15 -> 240 / 12 -> 20
                as.Fraction([ as.Numerator(16), as.Denominator(15) ]),    // 16/15 -> 240 / 16 -> 15
            ]
            const actualSegmentPieceLengths: PieceLength[] =
                computeSegmentPieceLengthsFromSegmentRatios(segmentRatios)

            expect(actualSegmentPieceLengths)
                .toEqual([ 16, 20, 15 ].map((expected: number) => as.Cardinal<ContourPiece<PitchValue>>(expected)))
        },
    )
})
