import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    from,
    INITIAL,
    Ordinal,
    positiveIntegers,
    Ratio,
    repeat,
    Scalar,
    to,
    TWO,
} from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from '../custom'
import { buildNoteSpec } from './notes'
import { BuildSegmentsParameters } from './types'

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    ({ durations, ratios, repetitions }: BuildSegmentsParameters): Segment[] =>
        positiveIntegers
            .slice(from.Ordinal(INITIAL), durations.length - 1)
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment => {
                const ratioTuple: Ratio = apply.Ordinal(ratios, apply.Translation(segmentIndex, to.Translation(-1)))

                const indexOfFirstPartsDurationForThisSegment: Ordinal = firstPartDurationIndex(segmentIndex)
                const indexOfSecondPartsDurationForThisSegment: Ordinal = secondPartDurationIndex(segmentIndex)

                const indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment: Ordinal =
                    to.Ordinal(from.Ordinal(segmentIndex) % TWO)
                const indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment: Ordinal =
                    from.Ordinal(indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment) === 1
                        ? to.Ordinal(0)
                        : to.Ordinal(1)

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
