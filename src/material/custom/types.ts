import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Ordinal } from '@musical-patterns/utilities'

interface ComputeSegmentDurationIndicesParameters {
    entityCount: Cardinal<Entity>,
    segmentIndex: Ordinal<Segment>,
}

export {
    ComputeSegmentDurationIndicesParameters,
}
