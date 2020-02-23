import { PitchValue } from '@musical-patterns/material'
import {
    as,
    computeCommonTerms,
    computeLeastCommonMultiple,
    ContourPiece,
    getNumerator,
    Numerator,
    quotient,
    Rational,
    round,
} from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'

const computeSegmentPieceLengthsFromSegmentRatios: (segmentRatios: Rational[]) => PieceLength[] =
    (segmentRatios: Rational[]): PieceLength[] => {
        const segmentRatiosInCommonTerms: Rational[] = computeCommonTerms(...segmentRatios)

        const numerators: Numerator[] = segmentRatiosInCommonTerms.map(getNumerator)
        const leastCommonMultipleOfNumerators: Numerator =
            computeLeastCommonMultiple(...numerators)

        return numerators
            .map((numerator: Numerator): Numerator =>
                as.Numerator(round(quotient(leastCommonMultipleOfNumerators, numerator))))
            .map((numerator: Numerator): PieceLength => as.Cardinal<ContourPiece<PitchValue>>(as.number(numerator)))
    }

export {
    computeSegmentPieceLengthsFromSegmentRatios,
}
