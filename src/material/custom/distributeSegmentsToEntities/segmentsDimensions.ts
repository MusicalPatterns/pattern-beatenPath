import { Segment } from '@musical-patterns/material'
import { apply, Cardinal, EXAMPLE_ELEMENT_INDEX, Ordinal, totalElements } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeSegmentsDimensions: (segments: Segment[]) => SegmentsDimensions =
    (segments: Segment[]): SegmentsDimensions => {
        const entityCount: Cardinal = totalElements(apply.Ordinal(segments, EXAMPLE_ELEMENT_INDEX as Ordinal<Segment>))
        const cycleLength: Cardinal = totalElements(segments)

        return {
            cycleLength,
            entityCount,
        }
    }

export {
    computeSegmentsDimensions,
}
