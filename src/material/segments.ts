import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    DENOMINATOR_INDEX,
    from,
    indexOfLastElement,
    INITIAL,
    negative,
    NUMERATOR_INDEX,
    Ordinal,
    positiveIntegers,
    Ratio,
    repeat,
    Scalar,
    slice,
    to,
    TWO,
} from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from '../custom'
import { buildNoteSpec } from './notes'
import { BuildSegmentsParameters } from './types'

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    ({ durations, ratios, repetitions }: BuildSegmentsParameters): Segment[] =>
        slice(positiveIntegers, INITIAL, indexOfLastElement(durations))
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment => {
                const ratioTuple: Ratio =
                    apply.Ordinal(ratios, apply.Translation(segmentIndex, to.Translation(negative(1))))

                const indexOfFirstPartsDurationForThisSegment: Ordinal = firstPartDurationIndex(segmentIndex)
                const indexOfSecondPartsDurationForThisSegment: Ordinal = secondPartDurationIndex(segmentIndex)

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

                const firstPartDurationScalar: Scalar =
                    apply.Ordinal(durations, indexOfFirstPartsDurationForThisSegment)
                const secondPartDurationScalar: Scalar =
                    apply.Ordinal(durations, indexOfSecondPartsDurationForThisSegment)

                return [
                    repeat([ firstPartDurationScalar ], apply.Cardinal(firstPartNotesCount, repetitions))
                        .map(buildNoteSpec),
                    repeat([ secondPartDurationScalar ], apply.Cardinal(secondPartNotesCount, repetitions))
                        .map(buildNoteSpec),
                ]
            })

export {
    buildSegments,
}
