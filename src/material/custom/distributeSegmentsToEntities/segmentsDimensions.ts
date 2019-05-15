import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, computeLength, exampleElement, insteadOf } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeSegmentsDimensions: (segments: Segment[]) => SegmentsDimensions =
    (segments: Segment[]): SegmentsDimensions => {
        const entityCount: Cardinal<Entity[]> = insteadOf<Cardinal, Entity[]>(computeLength(exampleElement(segments)))
        const cycleLength: Cardinal<Segment[]> = computeLength(segments)

        return {
            cycleLength,
            entityCount,
        }
    }

export {
    computeSegmentsDimensions,
}
