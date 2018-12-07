import { BuildEntitiesFunction, Entity, NoteSpec, TimbreName } from '@musical-patterns/compiler'
import { DictionaryOf } from '@musical-patterns/utilities'
import { BeatenPathPatternSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: BeatenPathPatternSpec): Entity[] => {
        const {
            beatenPathOnePart,
            beatenPathTwoPart,
        }: DictionaryOf<NoteSpec[]> = buildParts(patternSpec)

        const beatenPathOneEntity: Entity = {
            noteSpecs: beatenPathOnePart,
            timbreName: TimbreName.SQUARE,
        }

        const beatenPathTwoEntity: Entity = {
            noteSpecs: beatenPathTwoPart,
            timbreName: TimbreName.SAWTOOTH,
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildEntities,
}
