import {
    apply,
    Cardinal,
    Denominator,
    DENOMINATOR_INDEX,
    Fraction,
    from,
    Numerator,
    NUMERATOR_INDEX,
    Ordinal,
    to,
    TWO,
} from '@musical-patterns/utilities'

const isDenominator: (value: Numerator | Denominator) => value is Denominator =
    (value: Numerator | Denominator): value is Denominator =>
        (value as Denominator)._OperationBrand === 'Denominator'

const computeNoteCountsForSegment:
    ({ segmentIndex, fractions }: { fractions: Fraction[], segmentIndex: Ordinal }) => Cardinal[] =
    ({ segmentIndex, fractions }: { fractions: Fraction[], segmentIndex: Ordinal }): Cardinal[] => {
        const ratioTuple: Fraction = apply.Ordinal(fractions, segmentIndex)

        const indexOfFractionToDetermineSecondEntityNotesCountForThisSegment: Ordinal =
            apply.Modulus(segmentIndex, to.Modulus(TWO))
        const indexOfFractionToDetermineFirstEntityNotesCountForThisSegment: Ordinal =
            from.Ordinal(indexOfFractionToDetermineSecondEntityNotesCountForThisSegment) === 1
                ? NUMERATOR_INDEX
                : DENOMINATOR_INDEX

        const firstFractionalPart: Numerator | Denominator =
            apply.Ordinal(ratioTuple, indexOfFractionToDetermineFirstEntityNotesCountForThisSegment)
        const firstEntityNotesCount: Cardinal = to.Cardinal(
            isDenominator(firstFractionalPart) ?
                from.Denominator(firstFractionalPart) :
                from.Numerator(firstFractionalPart),
        )

        const secondFractionalPart: Numerator | Denominator =
            apply.Ordinal(ratioTuple, indexOfFractionToDetermineSecondEntityNotesCountForThisSegment)
        const secondEntityNotesCount: Cardinal = to.Cardinal(
            isDenominator(secondFractionalPart) ?
                from.Denominator(secondFractionalPart) :
                from.Numerator(secondFractionalPart),
        )

        return [ firstEntityNotesCount, secondEntityNotesCount ]
    }

export {
    computeNoteCountsForSegment,
}
