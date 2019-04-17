import { Note } from '@musical-patterns/material'
import { apply, from, INITIAL, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeInitialEmptyEntitiesNotes: (parameters: SegmentsDimensions) => Note[][] =
    ({ entityCount }: SegmentsDimensions): Note[][] => {
        const initialEmptyEntitiesNotes: Note[][] = []

        for (
            let entityIndex: Ordinal = INITIAL;
            entityIndex < to.Ordinal(from.Cardinal(entityCount));
            entityIndex = apply.Translation(entityIndex, NEXT)
        ) {
            initialEmptyEntitiesNotes.push([])
        }

        return initialEmptyEntitiesNotes
    }

export {
    computeInitialEmptyEntitiesNotes,
}
