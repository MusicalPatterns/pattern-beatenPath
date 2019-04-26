import { Note } from '@musical-patterns/material'
import { as, INITIAL, NEXT,  Ordinal, use } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeInitialEmptyEntitiesNotes: (parameters: SegmentsDimensions) => Note[][] =
    ({ entityCount }: SegmentsDimensions): Note[][] => {
        const initialEmptyEntitiesNotes: Note[][] = []

        for (
            let entityIndex: Ordinal = INITIAL;
            entityIndex < as.Ordinal(as.number(entityCount));
            entityIndex = use.Cardinal(entityIndex, NEXT)
        ) {
            initialEmptyEntitiesNotes.push([])
        }

        return initialEmptyEntitiesNotes
    }

export {
    computeInitialEmptyEntitiesNotes,
}
