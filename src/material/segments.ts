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
import { buildNoteSpec } from './notes'
import { BuildSegmentsParameters } from './types'

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    ({ durations, ratios, repetitions }: BuildSegmentsParameters): Segment[] =>
        positiveIntegers
            .slice(from.Index(INITIAL), durations.length - 1)
            .map(to.Index)
            .map((index: Index): Segment => {
                const ratioTuple: Ratio = apply.Index(ratios, apply.Offset(index, to.Offset(-1)))

                const indexOfFirstEntitysDurationForThisSegment: Index =
                    to.Index(Math.floor(from.Index(index) / EVEN) * EVEN)
                const indexOfSecondEntitysDurationForThisSegment: Index =
                    to.Index(Math.ceil(from.Index(index) / EVEN) * EVEN - 1)

                const indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisSegment: Index =
                    to.Index(from.Index(index) % EVEN)
                const indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisSegment: Index =
                    from.Index(indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisSegment) === 1
                        ? to.Index(0)
                        : to.Index(1)

                const firstEntityNotesCount: Count = to.Count(from.FractionalPart(
                    apply.Index(ratioTuple, indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisSegment),
                ))
                const secondEntityNotesCount: Count = to.Count(from.FractionalPart(
                    apply.Index(ratioTuple, indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisSegment),
                ))

                const firstEntityDurationScalar: Scalar =
                    apply.Index(durations, indexOfFirstEntitysDurationForThisSegment)
                const secondEntityDurationScalar: Scalar =
                    apply.Index(durations, indexOfSecondEntitysDurationForThisSegment)

                return [
                    repeat([ firstEntityDurationScalar ], apply.Count(firstEntityNotesCount, repetitions))
                        .map(buildNoteSpec),
                    repeat([ secondEntityDurationScalar ], apply.Count(secondEntityNotesCount, repetitions))
                        .map(buildNoteSpec),
                ]
            })

export {
    buildSegments,
}
