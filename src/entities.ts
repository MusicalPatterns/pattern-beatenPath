// tslint:disable-next-line:no-any no-magic-numbers
import { EntityConfig, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import * as to from '../../../src/utilities/to'
import { beatenPathNoteBlocks } from './notes'

const LAST_FOREVER: number = 9999
const BASE_RATIO: number = 1
// tslint:disable-next-line:no-magic-numbers
const MAIN_RATIO: number = 25 / 24
const QUIETER_THAN_POLYRHYTHM: number = 0.5

const entityOneNotes: Notes = sequence(beatenPathNoteBlocks.map((block: Notes[]): Notes => block[0]))
const entityTwoNotes: Notes = sequence(beatenPathNoteBlocks.map((block: Notes[]): Notes => block[1]))
const entityThreeNotes: Notes = [
    {
        duration: to.Time(LAST_FOREVER),
        gain: to.Scalar(QUIETER_THAN_POLYRHYTHM),
        pitchIndex: to.Index(0),
        pitchScalar: to.Scalar(BASE_RATIO),
        scaleIndex: to.Index(0),
        sustain: to.Time(LAST_FOREVER),
    },
]
const entityFourNotes: Notes = [
    {
        duration: to.Time(LAST_FOREVER),
        gain: to.Scalar(QUIETER_THAN_POLYRHYTHM),
        pitchIndex: to.Index(0),
        pitchScalar: to.Scalar(MAIN_RATIO),
        scaleIndex: to.Index(0),
        sustain: to.Time(LAST_FOREVER),
    },
]

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const beatenEntityOne: EntityConfig = {
    notes: entityOneNotes,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const beatenEntityTwo: EntityConfig = {
    notes: entityTwoNotes,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const beatenEntityThree: EntityConfig = {
    notes: entityThreeNotes,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SINE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const beatenEntityFour: EntityConfig = {
    notes: entityFourNotes,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SINE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

export {
    beatenEntityOne,
    beatenEntityTwo,
    beatenEntityThree,
    beatenEntityFour,
}
