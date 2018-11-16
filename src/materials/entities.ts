import { OscillatorName, VoiceType } from '@musical-patterns/performer'
import { DictionaryOf, Entity, Part } from '../../../../src'
import { BuildEntitiesFunction } from '../../../types'
import { BeatenPathPatternSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: BeatenPathPatternSpec): Entity[] => {
        const {
            beatenPathOnePart,
            beatenPathTwoPart,
        }: DictionaryOf<Part> = buildParts(patternSpec)

        const beatenPathOneEntity: Entity = {
            part: beatenPathOnePart,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const beatenPathTwoEntity: Entity = {
            part: beatenPathTwoPart,
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
