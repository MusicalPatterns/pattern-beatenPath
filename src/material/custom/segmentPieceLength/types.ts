import { Entity, PitchDuration, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'

interface ComputeSegmentPieceLengthsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentDurationIndices: Array<Ordinal<Scalar[]>>,
    segmentIndex: Ordinal<Segment[]>,
}

interface ComputeSegmentIntervalsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}

interface ComputeSegmentRatiosParameters {
    segmentIntervals: Fraction[]
}

interface AlignSegmentPieceLengthsWithSegmentDurationsParameters {
    segmentDurationIndices: Array<Ordinal<Scalar[]>>,
    segmentPieceLengths: Array<Cardinal<ContourPiece<PitchDuration>>>,
}

export {
    ComputeSegmentPieceLengthsParameters,
    ComputeSegmentIntervalsParameters,
    ComputeSegmentRatiosParameters,
    AlignSegmentPieceLengthsWithSegmentDurationsParameters,
}
