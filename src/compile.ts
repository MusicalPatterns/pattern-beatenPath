import buildEntity from '../../../src/compile/buildEntity'
import { EntityConfig, TimeType } from '../../../src/compile/types'
import { Config } from '../../../src/interface/state'
import { Song } from '../../../src/songTypes'
import { Entity, Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import { buildBeatenPathDurationsAndRatios } from './durations'
import { buildBeatenPathNoteBlocks } from './notes'
import { beatenPath } from './songs'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any
const MINIMUM_FUNCTIONAL_CORE: number = 2

const beatenPathCompile: (song: Song) => Promise<Entity[]> =
    async (song: Song): Promise<Entity[]> => {
        const config: Config = song.config
        const core: number = config.core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : config.core

        const {beatenPathRatios, beatenPathDurations} = buildBeatenPathDurationsAndRatios(core)

        const beatenPathNoteBlocks: Notes[][] = buildBeatenPathNoteBlocks(beatenPathDurations, beatenPathRatios)

        const entityOneNotes: Notes = sequence(beatenPathNoteBlocks.map((block: Notes[]): Notes => block[0]))
        const entityTwoNotes: Notes = sequence(beatenPathNoteBlocks.map((block: Notes[]): Notes => block[1]))

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
            buildEntity(entityConfig, beatenPath))
    }

export {
    beatenPathCompile,
}
