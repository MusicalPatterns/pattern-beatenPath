import { EntitySpec, EntitySpecs, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import { Block, Blocks } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const buildBeatenPathEntitySpecs: (beatenPathBlocks: Blocks) => EntitySpecs =
    (beatenPathBlocks: Blocks): EntitySpecs => {
        const beatenPathOneNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[ 0 ]))
        const beatenPathTwoNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[ 1 ]))

        const beatenPathOneEntitySpec: EntitySpec = {
            notes: beatenPathOneNotes,
            timeType: TimeType.RAW,
            voiceGain: TO_AVOID_BLOW_OUT,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const beatenPathTwoEntitySpec: EntitySpec = {
            notes: beatenPathTwoNotes,
            timeType: TimeType.RAW,
            voiceGain: TO_AVOID_BLOW_OUT,
            voiceSpec: { timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            beatenPathOneEntitySpec,
            beatenPathTwoEntitySpec,
        ]
    }

export {
    buildBeatenPathEntitySpecs,
}
