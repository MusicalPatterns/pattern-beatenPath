import { buildEntity } from '../../../src/compile/buildEntity'
import { EntityConfig, TimeType } from '../../../src/compile/types'
import { CustomConfig, Song } from '../../../src/songTypes'
import { Entities, Entity, Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import { buildbeatenPathBlocks } from './blocks'
import { buildBeatenPathDurationsAndRatios } from './durationsAndRatios'
import { Block, Blocks, Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any
// tslint:disable-next-line:no-any no-magic-numbers
const MINIMUM_FUNCTIONAL_CORE: Core = 2 as any

const beatenPathCompile: (song: Song) => Promise<Entities> =
    async (song: Song): Promise<Entities> => {
        const customConfig: CustomConfig = song.customConfig
        const core: Core = customConfig.core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : customConfig.core

        const {beatenPathRatios, beatenPathDurations} = buildBeatenPathDurationsAndRatios(core)

        const beatenPathBlocks: Blocks = buildbeatenPathBlocks(beatenPathDurations, beatenPathRatios)

        const entityOneNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[0]))
        const entityTwoNotes: Notes = sequence(beatenPathBlocks.map((block: Block): Notes => block[1]))

        const beatenEntityOne: EntityConfig = {
            notes: entityOneNotes,
            timeType: TimeType.RAW,
            voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const beatenEntityTwo: EntityConfig = {
            notes: entityTwoNotes,
            timeType: TimeType.RAW,
            voiceConfig: {timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR},
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const entityConfigsByCore: EntityConfig[] = [
            beatenEntityOne,
            beatenEntityTwo,
        ]

        return entityConfigsByCore.map((entityConfig: EntityConfig): Entity =>
            buildEntity(entityConfig, song))
    }

export {
    beatenPathCompile,
}
