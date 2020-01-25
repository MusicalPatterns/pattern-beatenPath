import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Ordinal, Rational, Scalar } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'

interface ComputeSegmentPieceLengthsParameters {
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
    segmentValueIndices: Array<Ordinal<Scalar[]>>,
}

interface ComputeSegmentIntervalsParameters {
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}

interface ComputeSegmentRatiosParameters {
    segmentIntervals: Rational[]
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
