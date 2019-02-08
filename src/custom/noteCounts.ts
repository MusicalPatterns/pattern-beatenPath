import {
    apply,
    Cardinal,
    DENOMINATOR_INDEX,
    from,
    negative,
    NUMERATOR_INDEX,
    Ordinal,
    Ratio,
    to,
    TWO,
} from '@musical-patterns/utilities'

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
        const firstPartNotesCount: Cardinal = to.Cardinal(from.FractionalPart(
            apply.Ordinal(ratioTuple, indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment),
        ))
        const secondPartNotesCount: Cardinal = to.Cardinal(from.FractionalPart(
            apply.Ordinal(ratioTuple, indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment),
        ))

        return [ firstPartNotesCount, secondPartNotesCount ]
    }

export {
    calculateNoteCounts,
}
