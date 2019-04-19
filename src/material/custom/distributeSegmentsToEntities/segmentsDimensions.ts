import { Entity, Segment } from '@musical-patterns/material'
import { apply, Cardinal, EXAMPLE_ELEMENT_INDEX, insteadOf, length } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeSegmentsDimensions: (segments: Segment[]) => SegmentsDimensions =
    (segments: Segment[]): SegmentsDimensions => {
        const entityCount: Cardinal<Entity> = insteadOf<Cardinal, Entity>(length(apply.Ordinal(
            segments,
            EXAMPLE_ELEMENT_INDEX,
        )))
        const cycleLength: Cardinal<Segment> = length(segments)

        return {
            cycleLength,
            entityCount,
        }
    }

export {
    computeSegmentsDimensions,
}
