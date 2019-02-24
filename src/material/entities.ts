import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { DictionaryOf } from '@musical-patterns/utilities'
import { BeatenPathSpec } from '../spec'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (spec: BeatenPathSpec): Entity[] => {
        const {
            firstPart,
            secondPart,
        }: DictionaryOf<NoteSpec[]> = buildParts(spec)

        const firstEntity: Entity = {
            noteSpecs: firstPart,
            timbreName: TimbreNameEnum.PUTNEY_WAVERING,
        }

        const secondEntity: Entity = {
            noteSpecs: secondPart,
            timbreName: TimbreNameEnum.ORGAN_2,
        }

        return [
            firstEntity,
            secondEntity,
        ]
    }

export {
    buildEntities,
}
