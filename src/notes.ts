import { Note, Notes } from '../../../src/types'
import numbers from '../../../src/utilities/numbers'
import repeat from '../../../src/utilities/repeat'
import * as to from '../../../src/utilities/to'
import { SUSTAIN_AMOUNT, TEMPO_ADJUST } from './constants'

const ONE: number = 1
const TWO: number = 2

const beatenPathNote: (n: number) => Note =
    (n: number): Note => ({
        duration: to.Time(n * TEMPO_ADJUST),
        gain: to.Scalar(ONE),
        pitchIndex: to.Index(ONE),
        pitchScalar: to.Scalar(ONE / n),
        scaleIndex: to.Index(0),
        sustain: to.Time(n * TEMPO_ADJUST * SUSTAIN_AMOUNT),
    })

const buildBeatenPathNoteBlocks: (beatenPathDurations: number[], beatenPathRatios: number[][]) => Notes[][] =
    (beatenPathDurations: number[], beatenPathRatios: number[][]): Notes[][] =>
        numbers
            .slice(0, beatenPathDurations.length - 1)
            .map((n: number): number[][] => {
                const indexOfFirstEntitysDurationForThisBlock: number = Math.floor(n / TWO) * TWO
                const indexOfSecondEntitysDurationForThisBlock: number = Math.ceil(n / TWO) * TWO - ONE

                const ratioTuple: number[] = beatenPathRatios[n - ONE]

                const indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock: number = n % TWO
                const indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock: number =
                    indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock === ONE ? 0 : ONE

                return [
                    repeat(
                        [beatenPathDurations[indexOfFirstEntitysDurationForThisBlock]],
                        ratioTuple[indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock],
                    ),
                    repeat(
                        [beatenPathDurations[indexOfSecondEntitysDurationForThisBlock]],
                        ratioTuple[indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock],
                    ),
                ]
            })
            .map((block: number[][]): Notes[] => block.map((notes: number[]): Notes => notes.map(beatenPathNote)))

export {
    buildBeatenPathNoteBlocks,
    beatenPathNote,
}
