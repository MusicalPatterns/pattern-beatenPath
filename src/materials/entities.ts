import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { DictionaryOf } from '@musical-patterns/utilities'
import { BeatenPathSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (spec: BeatenPathSpec): Entity[] => {
        const {
            firstPart,
            secondPart,
        }: DictionaryOf<NoteSpec[]> = buildParts(spec)

        const firstEntity: Entity = {
            noteSpecs: firstPart,
            timbreName: TimbreNameEnum.ORGAN_2,
        }

        const secondEntity: Entity = {
            noteSpecs: secondPart,
            timbreName: TimbreNameEnum.PUTNEY_WAVERING,
        }

        return [
            firstEntity,
            secondEntity,
        ]
    }

export {
    buildEntities,
}
