import { BuildEntitiesFunction, DictionaryOf, Entity, OscillatorName, Part, TimeType, VoiceType } from '../../../../src'
import { Core } from '../nominal'
import { BeatenPathPatternSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: BeatenPathPatternSpec): Entity[] => {
        const core: Core = patternSpec.core

        const {
            beatenPathOnePart,
            beatenPathTwoPart,
        }: DictionaryOf<Part> = buildParts(core)

        const beatenPathOneEntity: Entity = {
            part: beatenPathOnePart,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const beatenPathTwoEntity: Entity = {
            part: beatenPathTwoPart,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildEntities,
}
