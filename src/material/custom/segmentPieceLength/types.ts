import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'

interface ComputeSegmentPieceLengthsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
    segmentValueIndices: Array<Ordinal<Scalar[]>>,
}

interface ComputeSegmentIntervalsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}

interface ComputeSegmentRatiosParameters {
    segmentIntervals: Fraction[]
}

interface AlignSegmentPieceLengthsWithSegmentValuesParameters {
    segmentPieceLengths: PieceLength[],
    segmentValueIndices: Array<Ordinal<Scalar[]>>,
}

export {
    ComputeSegmentPieceLengthsParameters,
    ComputeSegmentIntervalsParameters,
    ComputeSegmentRatiosParameters,
    AlignSegmentPieceLengthsWithSegmentValuesParameters,
}
