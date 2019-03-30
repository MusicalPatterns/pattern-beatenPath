import { Entity, MaterializeEntities, Note, TimbreName, TimbreNameEnum } from '@musical-patterns/compiler'
import { apply, Cycle, map, Ordinal, to } from '@musical-patterns/utilities'
import { BeatenPathSpecs } from '../spec'
import { computeEntitiesNotes } from './custom'

const materializeEntities: MaterializeEntities =
    (specs: BeatenPathSpecs): Entity[] => {
        const entitiesNotes: Note[][] = computeEntitiesNotes(specs)

        const timbreNames: Cycle<TimbreName> = to.Cycle([
            TimbreNameEnum.PUTNEY_WAVERING,
            TimbreNameEnum.ORGAN_2,
            TimbreNameEnum.PHONEME_OOH,
            TimbreNameEnum.PHONEME_AH,
        ])

        return map(
            entitiesNotes,
            (entityNotes: Note[], timbreNameIndex: Ordinal): Entity => ({
                sections: [ { notes: entityNotes } ],
                timbreName: apply.Ordinal(timbreNames, timbreNameIndex),
            }),
        )
    }

export {
    materializeEntities,
}
