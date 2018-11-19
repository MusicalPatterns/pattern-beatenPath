import { Count, from, Index, Scalar, to } from '@musical-patterns/utilities'
import {
    applyCount,
    applyOffset,
    dereference,
    EVEN,
    INITIAL,
    numbers,
    repeat,
    Segment,
} from '../../../../src'
import { from as beatenPathFrom, Ratio } from '../nominal'
import { buildNoteSpec } from './notes'
import { BuildSegmentsParameters } from './types'

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    ({ beatenPathDurations, beatenPathRatios, repetitions }: BuildSegmentsParameters): Segment[] =>
        numbers
            .slice(from.Index(INITIAL), beatenPathDurations.length - 1)
            .map(to.Index)
            .map((index: Index): Segment => {
                const ratioTuple: Ratio = dereference(beatenPathRatios, applyOffset(index, to.Offset(-1)))

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

                const firstEntityNotesCount: Count = to.Count(beatenPathFrom.FractionalPart(
                    dereference(ratioTuple, indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisSegment),
                ))
                const secondEntityNotesCount: Count = to.Count(beatenPathFrom.FractionalPart(
                    dereference(ratioTuple, indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisSegment),
                ))

                const firstEntityDurationScalar: Scalar =
                    dereference(beatenPathDurations, indexOfFirstEntitysDurationForThisSegment)
                const secondEntityDurationScalar: Scalar =
                    dereference(beatenPathDurations, indexOfSecondEntitysDurationForThisSegment)

                return [
                    repeat([ firstEntityDurationScalar ], applyCount(firstEntityNotesCount, repetitions))
                        .map(buildNoteSpec),
                    repeat([ secondEntityDurationScalar ], applyCount(secondEntityNotesCount, repetitions))
                        .map(buildNoteSpec),
                ]
            })

export {
    buildSegments,
}
