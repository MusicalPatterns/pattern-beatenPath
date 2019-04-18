import { Segment } from '@musical-patterns/material'
import { apply, Cardinal, EXAMPLE_ELEMENT_INDEX, length, Ordinal } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeSegmentsDimensions: (segments: Segment[]) => SegmentsDimensions =
    (segments: Segment[]): SegmentsDimensions => {
        const entityCount: Cardinal = length(apply.Ordinal(segments, EXAMPLE_ELEMENT_INDEX as Ordinal<Segment>))
        const cycleLength: Cardinal = length(segments)

        return {
            cycleLength,
            entityCount,
        }
    }

export {
    computeSegmentsDimensions,
}
