import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Count,
    EVEN,
    from,
    Index,
    INITIAL,
    positiveIntegers,
    Ratio,
    repeat,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from '../custom'
import { buildNoteSpec } from './notes'
import { BuildSegmentsParameters } from './types'

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    ({ durations, ratios, repetitions }: BuildSegmentsParameters): Segment[] =>
        positiveIntegers
            .slice(from.Index(INITIAL), durations.length - 1)
            .map(to.Index)
            .map((segmentIndex: Index): Segment => {
                const ratioTuple: Ratio = apply.Index(ratios, apply.Offset(segmentIndex, to.Offset(-1)))

                const indexOfFirstPartsDurationForThisSegment: Index = firstPartDurationIndex(segmentIndex)
                const indexOfSecondPartsDurationForThisSegment: Index = secondPartDurationIndex(segmentIndex)

                const indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment: Index =
                    to.Index(from.Index(segmentIndex) % EVEN)
                const indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment: Index =
                    from.Index(indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment) === 1
                        ? to.Index(0)
                        : to.Index(1)

                const firstPartNotesCount: Count = to.Count(from.FractionalPart(
                    apply.Index(ratioTuple, indexOfRatioTupleToDetermineFirstPartsNotesCountForThisSegment),
                ))
                const secondPartNotesCount: Count = to.Count(from.FractionalPart(
                    apply.Index(ratioTuple, indexOfRatioTupleToDetermineSecondPartsNotesCountForThisSegment),
                ))

                const firstPartDurationScalar: Scalar =
                    apply.Index(durations, indexOfFirstPartsDurationForThisSegment)
                const secondPartDurationScalar: Scalar =
                    apply.Index(durations, indexOfSecondPartsDurationForThisSegment)

                return [
                    repeat([ firstPartDurationScalar ], apply.Count(firstPartNotesCount, repetitions))
                        .map(buildNoteSpec),
                    repeat([ secondPartDurationScalar ], apply.Count(secondPartNotesCount, repetitions))
                        .map(buildNoteSpec),
                ]
            })

export {
    buildSegments,
}
