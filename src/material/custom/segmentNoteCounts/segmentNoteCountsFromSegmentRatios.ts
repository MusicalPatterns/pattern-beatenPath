import {
    as,
    Cardinal,
    computeCommonTerms,
    computeLeastCommonMultiple,
    Fraction,
    getNumerator,
    notAs,
    Numerator,
    quotient,
    round,
} from '@musical-patterns/utilities'

const computeSegmentNoteCountsFromSegmentRatios: (segmentRatios: Fraction[]) => Cardinal[] =
    (segmentRatios: Fraction[]): Cardinal[] => {
        const segmentRatiosInCommonTerms: Fraction[] = computeCommonTerms(...segmentRatios)

        const numerators: Numerator[] = segmentRatiosInCommonTerms.map(getNumerator)
        const leastCommonMultipleOfNumerators: Numerator =
            computeLeastCommonMultiple(...numerators)

        return numerators
            .map((numerator: Numerator): Numerator =>
                as.Numerator(round(quotient(leastCommonMultipleOfNumerators, numerator))))
            .map(notAs.Numerator)
            .map(as.Cardinal)

    }

export {
    computeSegmentNoteCountsFromSegmentRatios,
}
