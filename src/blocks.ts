import { ONE, TWO } from '../../../src/constants'
import * as from from '../../../src/utilities/from'
import { Count, Index, Time } from '../../../src/utilities/nominalTypes'
import numbers from '../../../src/utilities/numbers'
import repeat from '../../../src/utilities/repeat'
import * as to from '../../../src/utilities/to'
import { beatenPathNote } from './notes'
import { Block, Blocks, Durations, Ratio, Ratios } from './types'
import * as beatenPathFrom from './utilities/from'

const buildBeatenPathBlocks: (beatenPathDurations: Durations, beatenPathRatios: Ratios) => Blocks =
    (beatenPathDurations: Durations, beatenPathRatios: Ratios): Blocks =>
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

                const firstEntityDuration: Time =
                    beatenPathDurations[ from.Index(indexOfFirstEntitysDurationForThisBlock) ]
                const secondEntityDuration: Time =
                    beatenPathDurations[ from.Index(indexOfSecondEntitysDurationForThisBlock) ]

                return [
                    repeat([ firstEntityDuration ], firstEntityNotesCount).map(beatenPathNote),
                    repeat([ secondEntityDuration ], secondEntityNotesCount).map(beatenPathNote),
                ]
            })

export {
    buildBeatenPathBlocks,
}
