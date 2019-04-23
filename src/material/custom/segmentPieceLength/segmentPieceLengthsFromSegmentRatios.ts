import { PitchDuration } from '@musical-patterns/material'
import {
    as,
    computeCommonTerms,
    computeLeastCommonMultiple,
    ContourPiece,
    Fraction,
    getNumerator,
    notAs,
    Numerator,
    quotient,
    round,
} from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'

const computeSegmentPieceLengthsFromSegmentRatios: (segmentRatios: Fraction[]) => PieceLength[] =
    (segmentRatios: Fraction[]): PieceLength[] => {
        const segmentRatiosInCommonTerms: Fraction[] = computeCommonTerms(...segmentRatios)

        const numerators: Numerator[] = segmentRatiosInCommonTerms.map(getNumerator)
        const leastCommonMultipleOfNumerators: Numerator =
            computeLeastCommonMultiple(...numerators)

        return numerators
            .map((numerator: Numerator): Numerator =>
                as.Numerator(round(quotient(leastCommonMultipleOfNumerators, numerator))))
            .map((numerator: Numerator) => as.Cardinal<ContourPiece<PitchDuration>>(notAs.Numerator(numerator)))
    }

export {
    computeSegmentPieceLengthsFromSegmentRatios,
}
