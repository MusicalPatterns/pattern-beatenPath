import { Segment } from '@musical-patterns/material'
import { Cardinal, Ordinal } from '@musical-patterns/utilities'

interface ComputeSegmentDurationIndicesParameters {
    entityCount: Cardinal,
    segmentIndex: Ordinal<Segment>,
}

export {
    ComputeSegmentDurationIndicesParameters,
}
