import { Entity, PitchDuration, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
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
}) => Array<Cardinal<ContourPiece<PitchDuration>>> =
    (
        {
            segmentDurationIndices,
            segmentIndex,
            coreIntervals,
            entityCount,
        }: ComputeSegmentPieceLengthsParameters,
    ): Array<Cardinal<ContourPiece<PitchDuration>>> => {

        const segmentIntervals: Fraction[] = computeSegmentIntervals({ segmentIndex, coreIntervals, entityCount })
        const segmentRatios: Fraction[] = computeSegmentRatios({ segmentIntervals })

        const segmentPieceLengthsFromSegmentRatios: Array<Cardinal<ContourPiece<PitchDuration>>> =
            computeSegmentPieceLengthsFromSegmentRatios(segmentRatios)

        return alignSegmentPieceLengthsWithSegmentDurations({
            segmentDurationIndices,
            segmentPieceLengths: segmentPieceLengthsFromSegmentRatios,
        })
    }

export {
    computeSegmentPieceLengths,
}
