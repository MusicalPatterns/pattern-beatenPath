import { Note, Notes } from '../../../src/types'
import calculateNotesDuration from '../../../src/utilities/calculateNotesDuration'
import * as from from '../../../src/utilities/from'
import { Time } from '../../../src/utilities/nominalTypes'
import numbers from '../../../src/utilities/numbers'
import * as to from '../../../src/utilities/to'
import { SUSTAIN_AMOUNT } from './constants'
import { beatenPathRatios } from './durations'
import { beatenPathNoteBlocks } from './notes'

const ONE: number = 1
// tslint:disable-next-line:no-magic-numbers
const JUST_SOME_SLIGHTLY_POSITIVE_INTERVAL_FOR_NOW: number = 25 / 24
// tslint:disable-next-line:no-magic-numbers
const HALFWAY: number = 1 / 2

const arpeggioNote: (duration: number, position: number) => Note =
    (duration: number, position: number): Note => ({
        duration: to.Time(duration),
        gain: to.Scalar(ONE),
        pitchIndex: to.Index(ONE),
        pitchScalar: to.Scalar(position),
        scaleIndex: to.Index(0),
        sustain: to.Time(duration * SUSTAIN_AMOUNT),
    })

const getPosition: (n: number, height: number) => number = (n: number, height: number): number => {
    const power: number = n < height * HALFWAY ? n : height - n

    return Math.pow(JUST_SOME_SLIGHTLY_POSITIVE_INTERVAL_FOR_NOW, power)
}

const arpeggioNoteBlocks: Notes[] = beatenPathRatios.map((ratioTuple: number[], index: number): Notes => {
    const blockDuration: Time = calculateNotesDuration(beatenPathNoteBlocks[index][0])
    const tenneyHeight: number = ratioTuple[0] * ratioTuple[1]

    return numbers
        .slice(0, tenneyHeight)
        .map((n: number): Note => {
            const duration: number = from.Time(blockDuration) / tenneyHeight
            const position: number = getPosition(n, tenneyHeight)

            return arpeggioNote(duration, position)
        })
})

export {
    arpeggioNoteBlocks,
}
