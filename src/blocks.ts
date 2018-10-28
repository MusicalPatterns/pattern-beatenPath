import { Count, EVEN, from, Index, INITIAL, numbers, repeat, Scalar, to } from '../../../src'
import { from as beatenPathFrom, Ratio } from './nominal'
import { beatenPathNote } from './notes'
import { Block, Blocks, Durations } from './types'

const buildBeatenPathBlocks: (beatenPathDurations: Durations, beatenPathRatios: Ratio[]) => Blocks =
    (beatenPathDurations: Durations, beatenPathRatios: Ratio[]): Blocks =>
        numbers
            .slice(from.Index(INITIAL), beatenPathDurations.length - 1)
            .map(to.Index)
            .map((index: Index): Block => {
                const ratioTuple: Ratio = beatenPathRatios[ from.Index(index) - 1 ]

                const indexOfFirstEntitysDurationForThisBlock: Index =
                    to.Index(Math.floor(from.Index(index) / EVEN) * EVEN)
                const indexOfSecondEntitysDurationForThisBlock: Index =
                    to.Index(Math.ceil(from.Index(index) / EVEN) * EVEN - 1)

                const indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock: Index =
                    to.Index(from.Index(index) % EVEN)
                const indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock: Index =
                    from.Index(indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock) === 1
                        ? to.Index(0)
                        : to.Index(1)

                const firstEntityNotesCount: Count = to.Count(beatenPathFrom.FractionalPart(
                    ratioTuple[ from.Index(indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock) ],
                ))
                const secondEntityNotesCount: Count = to.Count(beatenPathFrom.FractionalPart(
                    ratioTuple[ from.Index(indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock) ],
                ))

                const firstEntityDurationScalar: Scalar =
                    beatenPathDurations[ from.Index(indexOfFirstEntitysDurationForThisBlock) ]
                const secondEntityDurationScalar: Scalar =
                    beatenPathDurations[ from.Index(indexOfSecondEntitysDurationForThisBlock) ]

                return [
                    repeat([ firstEntityDurationScalar ], firstEntityNotesCount)
                        .map(beatenPathNote),
                    repeat([ secondEntityDurationScalar ], secondEntityNotesCount)
                        .map(beatenPathNote),
                ]
            })

export {
    buildBeatenPathBlocks,
}
