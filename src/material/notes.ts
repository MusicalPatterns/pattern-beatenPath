import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { BeatenPathSpecs } from '../spec'
import { computeEntitiesNotesFromSegments } from './custom'
import { computeSegments } from './segments'

const computeEntitiesNotes: (specs: BeatenPathSpecs) => Note[][] =
    ({ core, entityCount, repetitions, reverse, style }: BeatenPathSpecs): Note[][] => {
        const segments: Segment[] = computeSegments({ core, entityCount, repetitions, style })

        const entitiesNotes: Note[][] = computeEntitiesNotesFromSegments(segments)

        if (reverse) {
            entitiesNotes.forEach((notes: Note[]) => {
                notes.reverse()
            })
        }

        return entitiesNotes
    }

export {
    computeEntitiesNotes,
}
