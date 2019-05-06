import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, exampleElement, insteadOf, length } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeSegmentsDimensions: (segments: Segment[]) => SegmentsDimensions =
    (segments: Segment[]): SegmentsDimensions => {
        const entityCount: Cardinal<Entity[]> = insteadOf<Cardinal, Entity[]>(length(exampleElement(segments)))
        const cycleLength: Cardinal<Segment[]> = length(segments)

        return {
            cycleLength,
            entityCount,
        }
    }

export {
    computeSegmentsDimensions,
}
