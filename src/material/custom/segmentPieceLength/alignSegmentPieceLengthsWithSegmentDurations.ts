import { PitchDuration } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    ContourPiece,
    insteadOf,
    min,
    negative,
    ofNotAs,
    Ordinal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { AlignSegmentPieceLengthsWithSegmentDurationsParameters } from './types'

const alignSegmentPieceLengthsWithSegmentDurations: (parameters: {
    segmentDurationIndices: Array<Ordinal<Scalar[]>>,
    segmentPieceLengths: Array<Cardinal<ContourPiece<PitchDuration>>>,
}) => Array<Cardinal<ContourPiece<PitchDuration>>> =
    (
        {
            segmentPieceLengths,
            segmentDurationIndices,
        }: AlignSegmentPieceLengthsWithSegmentDurationsParameters,
    ): Array<Cardinal<ContourPiece<PitchDuration>>> => {
        const leastSegmentDurationIndex: Ordinal<Scalar[]> = min(...segmentDurationIndices)
        const segmentPieceLengthsIndices: Array<Ordinal<Array<Cardinal<ContourPiece<PitchDuration>>>>> =
            segmentDurationIndices.map(
                (segmentDurationIndex: Ordinal<Scalar[]>) =>
                    insteadOf<Ordinal, Array<Cardinal<ContourPiece<PitchDuration>>>>(use.Cardinal(
                        segmentDurationIndex,
                        as.Cardinal(ofNotAs(negative(leastSegmentDurationIndex))),
                    )),
            )

        return segmentPieceLengthsIndices.map(
            (segmentPieceLengthsIndex: Ordinal<Array<Cardinal<ContourPiece<PitchDuration>>>>) =>
                use.Ordinal(segmentPieceLengths, segmentPieceLengthsIndex),
        )
    }

export {
    alignSegmentPieceLengthsWithSegmentDurations,
}
