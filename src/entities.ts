import { EntityConfig, EntityConfigs, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import { Block, Blocks } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const buildBeatenPathEntityConfigs: (beatenPathBlocks: Blocks) => EntityConfigs =
    (beatenPathBlocks: Blocks): EntityConfigs => {
        const entityOneNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[ 0 ]))
        const entityTwoNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[ 1 ]))

        const beatenEntityOne: EntityConfig = {
            notes: entityOneNotes,
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const beatenEntityTwo: EntityConfig = {
            notes: entityTwoNotes,
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        return [
            beatenEntityOne,
            beatenEntityTwo,
        ]
    }

export {
    buildBeatenPathEntityConfigs,
}
