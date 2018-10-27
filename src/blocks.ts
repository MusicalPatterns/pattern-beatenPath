import { Count, from, Index, numbers, ONE, repeat, Scalar, to, TWO } from '../../../src'
import { from as beatenPathFrom, Ratio } from './nominal'
import { beatenPathNote } from './notes'
import { Block, Blocks, Durations } from './types'

const buildBeatenPathBlocks: (beatenPathDurations: Durations, beatenPathRatios: Ratio[]) => Blocks =
    (beatenPathDurations: Durations, beatenPathRatios: Ratio[]): Blocks =>
        numbers
            .slice(0, beatenPathDurations.length - 1)
            .map(to.Index)
            .map((index: Index): Block => {
                const ratioTuple: Ratio = beatenPathRatios[ from.Index(index) - ONE ]

                const indexOfFirstEntitysDurationForThisBlock: Index =
                    to.Index(Math.floor(from.Index(index) / TWO) * TWO)
                const indexOfSecondEntitysDurationForThisBlock: Index =
                    to.Index(Math.ceil(from.Index(index) / TWO) * TWO - ONE)

                const indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock: Index =
                    to.Index(from.Index(index) % TWO)
                const indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock: Index =
                    from.Index(indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock) === ONE
                        ? to.Index(0)
                        : to.Index(ONE)

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
