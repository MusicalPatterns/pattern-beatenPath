import { Entity, MaterializeEntities, Note, TimbreName, TimbreNameEnum } from '@musical-patterns/material'
import { apply, Cycle, insteadOf, map, Ms, Ordinal, to } from '@musical-patterns/utilities'
import { BeatenPathSpecs } from '../spec'
import { BeatenPathEntitiesNotes, computeEntitiesNotes } from './custom'

const materializeEntities: MaterializeEntities =
    (specs: BeatenPathSpecs): Entity[] => {
        const { delays, entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)

        const timbreNames: Cycle<TimbreName> = to.Cycle([
            TimbreNameEnum.PUTNEY_WAVERING,
            TimbreNameEnum.ORGAN_2,
            TimbreNameEnum.PHONEME_OOH,
            TimbreNameEnum.PHONEME_AH,
        ])

        return map(
            entitiesNotes,
            (entityNotes: Note[], index: Ordinal<Note[]>): Entity => ({
                delay: apply.Ordinal(delays, insteadOf<Ordinal, Ms>(index)),
                sections: [ { notes: entityNotes } ],
                timbreName: apply.Ordinal(timbreNames, insteadOf<Ordinal, TimbreName>(index)),
            }),
        )
    }

export {
    materializeEntities,
}
