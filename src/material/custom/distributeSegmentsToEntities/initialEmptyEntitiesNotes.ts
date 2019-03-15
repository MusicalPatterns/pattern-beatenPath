import { Note } from '@musical-patterns/compiler'
import { apply, INITIAL, NEXT, Ordinal } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeInitialEmptyEntitiesNotes: (parameters: SegmentsDimensions) => Note[][] =
    ({ entityCount }: SegmentsDimensions): Note[][] => {
        const initialEmptyEntitiesNotes: Note[][] = []

        for (
            let entityIndex: Ordinal = INITIAL;
            entityIndex < entityCount;
            entityIndex = apply.Translation(entityIndex, NEXT)
        ) {
            initialEmptyEntitiesNotes.push([])
        }

        return initialEmptyEntitiesNotes
    }

export {
    computeInitialEmptyEntitiesNotes,
}
