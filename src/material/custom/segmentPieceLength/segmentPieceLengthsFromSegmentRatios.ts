import { PitchDuration } from '@musical-patterns/material'
import {
    as,
    Cardinal,
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

const computeSegmentPieceLengthsFromSegmentRatios:
    (segmentRatios: Fraction[]) => Array<Cardinal<ContourPiece<PitchDuration>>> =
    (segmentRatios: Fraction[]): Array<Cardinal<ContourPiece<PitchDuration>>> => {
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
