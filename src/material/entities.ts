import { BuildEntitiesFunction, Entity, TimbreNameEnum } from '@musical-patterns/compiler'
import { BeatenPathSpec } from '../spec'
import { buildParts } from './parts'
import { BeatenPathPart, BeatenPathParts } from './types'

const buildEntities: BuildEntitiesFunction =
    (spec: BeatenPathSpec): Entity[] => {
        const parts: BeatenPathParts = buildParts(spec)

        const firstEntity: Entity = {
            noteSpecs: parts[ BeatenPathPart.FIRST_PART ],
            timbreName: TimbreNameEnum.PUTNEY_WAVERING,
        }

        const secondEntity: Entity = {
            noteSpecs: parts[ BeatenPathPart.SECOND_PART ],
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
