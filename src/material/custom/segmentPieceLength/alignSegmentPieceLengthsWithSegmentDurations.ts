import { as, insteadOf, min, negative, ofNotAs, Ordinal, Scalar, use } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'
import { AlignSegmentPieceLengthsWithSegmentDurationsParameters } from './types'

const alignSegmentPieceLengthsWithSegmentDurations: (parameters: {
    segmentDurationIndices: Array<Ordinal<Scalar[]>>,
    segmentPieceLengths: PieceLength[],
}) => PieceLength[] =
    (
        {
            segmentPieceLengths,
            segmentDurationIndices,
        }: AlignSegmentPieceLengthsWithSegmentDurationsParameters,
    ): PieceLength[] => {
        const leastSegmentDurationIndex: Ordinal<Scalar[]> = min(...segmentDurationIndices)
        const segmentPieceLengthsIndices: Array<Ordinal<PieceLength[]>> =
            segmentDurationIndices.map(
                (segmentDurationIndex: Ordinal<Scalar[]>) =>
                    insteadOf<Ordinal, PieceLength[]>(use.Cardinal(
                        segmentDurationIndex,
                        as.Cardinal(ofNotAs(negative(leastSegmentDurationIndex))),
                    )),
            )

        return segmentPieceLengthsIndices.map(
            (segmentPieceLengthsIndex: Ordinal<PieceLength[]>) =>
                use.Ordinal(segmentPieceLengths, segmentPieceLengthsIndex),
        )
    }

export {
    alignSegmentPieceLengthsWithSegmentDurations,
}
