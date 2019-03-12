import { Entity, MaterializeEntities, TimbreNameEnum } from '@musical-patterns/compiler'
import { BeatenPathSpecs } from '../spec'
import { computeNotes } from './notes'
import { BeatenPathEntity, BeatenPathEntityNotes } from './types'

const materializeEntities: MaterializeEntities =
    (specs: BeatenPathSpecs): Entity[] => {
        const notes: BeatenPathEntityNotes = computeNotes(specs)

        const firstEntity: Entity = {
            notes: notes[ BeatenPathEntity.FIRST ],
            timbreName: TimbreNameEnum.PUTNEY_WAVERING,
        }

        const secondEntity: Entity = {
            notes: notes[ BeatenPathEntity.SECOND ],
            timbreName: TimbreNameEnum.ORGAN_2,
        }

        return [
            firstEntity,
            secondEntity,
        ]
    }

export {
    materializeEntities,
}
