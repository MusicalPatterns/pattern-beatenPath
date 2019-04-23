import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'
import { alignSegmentPieceLengthsWithSegmentDurations } from './alignSegmentPieceLengthsWithSegmentDurations'
import { computeSegmentIntervals } from './segmentIntervals'
import { computeSegmentPieceLengthsFromSegmentRatios } from './segmentPieceLengthsFromSegmentRatios'
import { computeSegmentRatios } from './segmentRatios'
import { ComputeSegmentPieceLengthsParameters } from './types'

const computeSegmentPieceLengths: (parameters: {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentDurationIndices: Array<Ordinal<Scalar[]>>,
    segmentIndex: Ordinal<Segment[]>,
}) => PieceLength[] =
    (
        {
            segmentDurationIndices,
            segmentIndex,
            coreIntervals,
            entityCount,
        }: ComputeSegmentPieceLengthsParameters,
    ): PieceLength[] => {

        const segmentIntervals: Fraction[] = computeSegmentIntervals({ segmentIndex, coreIntervals, entityCount })
        const segmentRatios: Fraction[] = computeSegmentRatios({ segmentIntervals })

        const segmentPieceLengthsFromSegmentRatios: PieceLength[] =
            computeSegmentPieceLengthsFromSegmentRatios(segmentRatios)

        return alignSegmentPieceLengthsWithSegmentDurations({
            segmentDurationIndices,
            segmentPieceLengths: segmentPieceLengthsFromSegmentRatios,
        })
    }

export {
    computeSegmentPieceLengths,
}
