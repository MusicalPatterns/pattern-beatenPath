import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Ordinal, Rational, Scalar } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'
import { alignSegmentPieceLengthsWithSegmentValues } from './alignSegmentPieceLengthsWithSegmentValues'
import { computeSegmentIntervals } from './segmentIntervals'
import { computeSegmentPieceLengthsFromSegmentRatios } from './segmentPieceLengthsFromSegmentRatios'
import { computeSegmentRatios } from './segmentRatios'
import { ComputeSegmentPieceLengthsParameters } from './types'

const computeSegmentPieceLengths: (parameters: {
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
    segmentValueIndices: Array<Ordinal<Scalar[]>>,
}) => PieceLength[] =
    (
        {
            coreIntervals,
            entityCount,
            segmentIndex,
            segmentValueIndices,
        }: ComputeSegmentPieceLengthsParameters,
    ): PieceLength[] => {

        const segmentIntervals: Rational[] = computeSegmentIntervals({ segmentIndex, coreIntervals, entityCount })
        const segmentRatios: Rational[] = computeSegmentRatios({ segmentIntervals })

        const segmentPieceLengthsFromSegmentRatios: PieceLength[] =
            computeSegmentPieceLengthsFromSegmentRatios(segmentRatios)

        return alignSegmentPieceLengthsWithSegmentValues({
            segmentPieceLengths: segmentPieceLengthsFromSegmentRatios,
            segmentValueIndices,
        })
    }

export {
    computeSegmentPieceLengths,
}
