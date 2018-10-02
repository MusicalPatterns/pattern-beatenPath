import { Note, Notes } from '../../../src/types'
import numbers from '../../../src/utilities/numbers'
import repeat from '../../../src/utilities/repeat'
import * as to from '../../../src/utilities/to'
import { beatenPathDurations } from './durations'
import { beatenPathRatios } from './ratios'

const TEMPO_ADJUST: number = 100
const SUSTAIN_CLIP: number = 10
const ONE: number = 1
const TWO: number = 2

const beatenPathNote: (n: number) => Note =
    (n: number): Note => ({
        duration: to.Time(n * TEMPO_ADJUST),
        gain: to.Scalar(ONE),
        pitchIndex: to.Index(ONE),
        pitchScalar: to.Scalar(ONE / n),
        scaleIndex: to.Index(0),
        sustain: to.Time(n * TEMPO_ADJUST - SUSTAIN_CLIP),
    })

const beatenPathNoteBlocks: Notes[][] = numbers
    .slice(0, beatenPathDurations.length - 1)
    .map((n: number): number[][] => {
        const indexOfFirstEntitysDurationForThisBlock: number = Math.floor(n / TWO) * TWO
        const indexOfSecondEntitysDurationForThisBlock: number = Math.ceil(n / TWO) * TWO - ONE

        const ratioBetweenTheseTwoDurationsAsTupleOfNumeratorAndDenominator: number[] = beatenPathRatios[n - ONE]

        const indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock: number = n % TWO
        const indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock: number =
            indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock === ONE ? 0 : ONE

        return [
            repeat(
                [beatenPathDurations[indexOfFirstEntitysDurationForThisBlock]],
                ratioBetweenTheseTwoDurationsAsTupleOfNumeratorAndDenominator[
                    indexOfRatioTupleToDetermineFirstEntitysNotesCountForThisBlock
                    ],
            ),
            repeat(
                [beatenPathDurations[indexOfSecondEntitysDurationForThisBlock]],
                ratioBetweenTheseTwoDurationsAsTupleOfNumeratorAndDenominator[
                    indexOfRatioTupleToDetermineSecondEntitysNotesCountForThisBlock
                    ],
            ),
        ]
    })
    .map((block: number[][]): Notes[] => block.map((notes: number[]): Notes => notes.map(beatenPathNote)))

export {
    beatenPathNoteBlocks,
    beatenPathNote,
}
