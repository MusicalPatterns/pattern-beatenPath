import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { DictionaryOf } from '@musical-patterns/utilities'
import { BeatenPathPatternSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: BeatenPathPatternSpec): Entity[] => {
        const {
            firstPart,
            secondPart,
        }: DictionaryOf<NoteSpec[]> = buildParts(patternSpec)

        const firstEntity: Entity = {
            noteSpecs: firstPart,
            timbreName: TimbreNameEnum.SQUARE,
        }

        const secondEntity: Entity = {
            noteSpecs: secondPart,
            timbreName: TimbreNameEnum.SAWTOOTH,
        }

        return [
            firstEntity,
            secondEntity,
        ]
    }

export {
    buildEntities,
}
