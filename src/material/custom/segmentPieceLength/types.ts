import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'

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
    segmentPieceLengths: PieceLength[],
}

export {
    ComputeSegmentPieceLengthsParameters,
    ComputeSegmentIntervalsParameters,
    ComputeSegmentRatiosParameters,
    AlignSegmentPieceLengthsWithSegmentDurationsParameters,
}
