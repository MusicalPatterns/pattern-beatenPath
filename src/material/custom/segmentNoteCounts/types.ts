import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'

interface ComputeSegmentNoteCountsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity>,
    segmentDurationIndices: Array<Ordinal<Scalar>>,
    segmentIndex: Ordinal<Segment>,
}

interface ComputeSegmentIntervalsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity>,
    segmentIndex: Ordinal<Segment>,
}

interface ComputeSegmentRatiosParameters {
    segmentIntervals: Fraction[]
}

interface AlignSegmentNoteCountsWithSegmentDurationsParameters {
    segmentDurationIndices: Array<Ordinal<Scalar>>,
    segmentNoteCounts: Cardinal[],
}

export {
    ComputeSegmentNoteCountsParameters,
    ComputeSegmentIntervalsParameters,
    ComputeSegmentRatiosParameters,
    AlignSegmentNoteCountsWithSegmentDurationsParameters,
}
