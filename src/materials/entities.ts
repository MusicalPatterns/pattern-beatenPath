import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
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
            timbreName: TimbreNameEnum.SQUARE,
        }

        const beatenPathTwoEntity: Entity = {
            noteSpecs: beatenPathTwoPart,
            timbreName: TimbreNameEnum.SAWTOOTH,
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildEntities,
}
