import {
    apply,
    Cardinal,
    Denominator,
    DENOMINATOR_INDEX,
    from,
    negative,
    Numerator,
    NUMERATOR_INDEX,
    Ordinal,
    Ratio,
    to,
    TWO,
} from '@musical-patterns/utilities'

const isDenominator: (value: Numerator | Denominator) => value is Denominator =
    (value: Numerator | Denominator): value is Denominator =>
        (value as Denominator)._OperationBrand === 'Denominator'

const calculateNoteCounts: ({ segmentIndex, ratios }: { ratios: Ratio[], segmentIndex: Ordinal }) => Cardinal[] =
    ({ segmentIndex, ratios }: { ratios: Ratio[], segmentIndex: Ordinal }): Cardinal[] => {
        const ratioTuple: Ratio =
            apply.Ordinal(ratios, apply.Translation(segmentIndex, to.Translation(negative(1))))

        const indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment: Ordinal =
            apply.Modulus(segmentIndex, to.Modulus(TWO))
        const indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment: Ordinal =
            from.Ordinal(indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment) === 1
                ? NUMERATOR_INDEX
                : DENOMINATOR_INDEX

        const firstRatioPart: Numerator | Denominator =
            apply.Ordinal(ratioTuple, indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment)
        const firstPartNotesCount: Cardinal = to.Cardinal(
            isDenominator(firstRatioPart) ? from.Denominator(firstRatioPart) : from.Numerator(firstRatioPart),
        )

        const secondRatioPart: Numerator | Denominator =
            apply.Ordinal(ratioTuple, indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment)
        const secondPartNotesCount: Cardinal = to.Cardinal(
            isDenominator(secondRatioPart) ? from.Denominator(secondRatioPart) : from.Numerator(secondRatioPart),
        )

        return [ firstPartNotesCount, secondPartNotesCount ]
    }

export {
    calculateNoteCounts,
}
