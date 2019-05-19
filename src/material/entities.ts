import { Entity, MaterializeEntities, Note, TimbreName, TimbreNameEnum } from '@musical-patterns/material'
import { as, Cycle, Duration, insteadOf, map, Ordinal, use } from '@musical-patterns/utilities'
import { BeatenPathSpecs } from '../spec'
import { BeatenPathEntitiesNotes, computeEntitiesNotes } from './custom'

const materializeEntities: MaterializeEntities =
    (specs: BeatenPathSpecs): Entity[] => {
        const { delays, entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)

        const timbreNames: Cycle<TimbreName> = as.Cycle([
            TimbreNameEnum.FLUTE,
            TimbreNameEnum.CELLO,
            TimbreNameEnum.TROMBONE,
            TimbreNameEnum.VIOLIN,
        ])

        return map(
            entitiesNotes,
            (entityNotes: Note[], index: Ordinal<Note[][]>): Entity => ({
                delay: use.Ordinal(delays, insteadOf<Ordinal, Duration[]>(index)),
                sections: [ { notes: entityNotes } ],
                timbreName: use.Ordinal(timbreNames, insteadOf<Ordinal, TimbreName[]>(index)),
            }),
        )
    }

export {
    materializeEntities,
}
