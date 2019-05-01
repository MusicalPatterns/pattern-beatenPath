import { as, insteadOf, min, negative, ofNotAs, Ordinal, Scalar, use } from '@musical-patterns/utilities'
import { PieceLength } from '../../../types'
import { AlignSegmentPieceLengthsWithSegmentValuesParameters } from './types'

const alignSegmentPieceLengthsWithSegmentValues: (parameters: {
    segmentPieceLengths: PieceLength[],
    segmentValueIndices: Array<Ordinal<Scalar[]>>,
}) => PieceLength[] =
    (
        {
            segmentPieceLengths,
            segmentValueIndices,
        }: AlignSegmentPieceLengthsWithSegmentValuesParameters,
    ): PieceLength[] => {
        const leastSegmentValueIndex: Ordinal<Scalar[]> = min(...segmentValueIndices)
        const segmentPieceLengthsIndices: Array<Ordinal<PieceLength[]>> =
            segmentValueIndices.map(
                (segmentValueIndex: Ordinal<Scalar[]>) =>
                    insteadOf<Ordinal, PieceLength[]>(use.Cardinal(
                        segmentValueIndex,
                        as.Cardinal(ofNotAs(negative(leastSegmentValueIndex))),
                    )),
            )

        return segmentPieceLengthsIndices.map(
            (segmentPieceLengthsIndex: Ordinal<PieceLength[]>) =>
                use.Ordinal(segmentPieceLengths, segmentPieceLengthsIndex),
        )
    }

export {
    alignSegmentPieceLengthsWithSegmentValues,
}
