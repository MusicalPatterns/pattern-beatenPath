import {
    Cardinal,
    computeCommonTerms,
    computeLeastCommonMultiple,
    Fraction,
    getNumerator,
    Integer,
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
            to.Numerator(computeLeastCommonMultiple(...numerators as Integer[]))

        return numerators
            .map((numerator: Numerator) =>
                round(quotient(leastCommonMultipleOfNumerators, numerator)))
            .map(to.Cardinal)

    }

export {
    computeSegmentNoteCountsFromSegmentRatios,
}
