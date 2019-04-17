import {
    Cardinal,
    computeCommonTerms,
    computeLeastCommonMultiple,
    Fraction,
    from,
    getNumerator,
    Numerator,
    quotient,
    round,
    to,
} from '@musical-patterns/utilities'

const computeSegmentNoteCountsFromSegmentRatios: (segmentRatios: Fraction[]) => Cardinal[] =
    (segmentRatios: Fraction[]): Cardinal[] => {
        const segmentRatiosInCommonTerms: Fraction[] = computeCommonTerms(...segmentRatios)

        const numerators: Numerator[] = segmentRatiosInCommonTerms.map(getNumerator)
        const leastCommonMultipleOfNumerators: Numerator =
            computeLeastCommonMultiple(...numerators)

        return numerators
            .map((numerator: Numerator): Numerator =>
                round(quotient(leastCommonMultipleOfNumerators, numerator)))
            .map(from.Numerator)
            .map(to.Cardinal)

    }

export {
    computeSegmentNoteCountsFromSegmentRatios,
}
