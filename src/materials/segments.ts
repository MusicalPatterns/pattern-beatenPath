import { Count, EVEN, from, Index, INITIAL, numbers, repeat, Scalar, Segment, to } from '../../../../src'
import { from as beatenPathFrom, Ratio } from '../nominal'
import { Durations } from '../types'
import { buildBeatenPathNoteSpec } from './notes'

const buildBeatenPathSegments: (beatenPathDurations: Durations, beatenPathRatios: Ratio[]) => Segment[] =
    (beatenPathDurations: Durations, beatenPathRatios: Ratio[]): Segment[] =>
        numbers
            .slice(from.Index(INITIAL), beatenPathDurations.length - 1)
            .map(to.Index)
            .map((index: Index): Segment => {
                const ratioTuple: Ratio = beatenPathRatios[ from.Index(index) - 1 ]

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
                    ratioTuple[ from.Index(indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisSegment) ],
                ))
                const secondEntityNotesCount: Count = to.Count(beatenPathFrom.FractionalPart(
                    ratioTuple[ from.Index(indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisSegment) ],
                ))

                const firstEntityDurationScalar: Scalar =
                    beatenPathDurations[ from.Index(indexOfFirstEntitysDurationForThisSegment) ]
                const secondEntityDurationScalar: Scalar =
                    beatenPathDurations[ from.Index(indexOfSecondEntitysDurationForThisSegment) ]

                return [
                    repeat([ firstEntityDurationScalar ], firstEntityNotesCount)
                        .map(buildBeatenPathNoteSpec),
                    repeat([ secondEntityDurationScalar ], secondEntityNotesCount)
                        .map(buildBeatenPathNoteSpec),
                ]
            })

export {
    buildBeatenPathSegments,
}
