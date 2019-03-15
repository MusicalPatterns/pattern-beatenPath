import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { deepClone, forEach, Ordinal, sequence } from '@musical-patterns/utilities'
import { DistributeSegmentNotesToEntitiesParameters } from './types'

const distributeSegmentNotesToEntities: (parameters: DistributeSegmentNotesToEntitiesParameters) => Note[][] =
    ({ segments, existingEntitiesNotes }: DistributeSegmentNotesToEntitiesParameters): Note[][] => {
        const populatedEntitiesNotes: Note[][] = deepClone(existingEntitiesNotes)

        segments.forEach((segment: Segment): void => {
            forEach(
                segment,
                (notes: Note[], entityIndex: Ordinal): void => {
                    populatedEntitiesNotes[ entityIndex ] = sequence([
                        populatedEntitiesNotes[ entityIndex ],
                        notes,
                    ])
                })
        })

        return populatedEntitiesNotes
    }

export {
    distributeSegmentNotesToEntities,
}
