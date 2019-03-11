import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    indexOfLastElement,
    INITIAL,
    map,
    Ordinal,
    Scalar,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'
import { computeNoteCountsForSegment, selectScalarsForSegment } from './custom'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputePiece, ComputeSegmentsParameters } from './types'

const computeSegment: (segmentIndex: Ordinal, computeSegmentsParameters: ComputeSegmentsParameters) => Segment =
    (segmentIndex: Ordinal, { scalars, fractions, repetitions, style }: ComputeSegmentsParameters): Segment => {
        const scalarsForSegment: Scalar[] = selectScalarsForSegment({ scalars, segmentIndex })
        const noteCounts: Cardinal[] = computeNoteCountsForSegment({ fractions, segmentIndex })

        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        return map(scalarsForSegment, (scalar: Scalar, index: Ordinal): Note[] =>
            computePiece({
                notesCount: apply.Ordinal(noteCounts, index),
                repetitions,
                scalar,
            })
                .map(computeNote))
    }

const computeSegments: (computeSegmentsParameters: ComputeSegmentsParameters) => Segment[] =
    (computeSegmentsParameters: ComputeSegmentsParameters): Segment[] =>
        slice(zeroAndPositiveIntegers, INITIAL, indexOfLastElement(computeSegmentsParameters.scalars))
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment =>
                computeSegment(segmentIndex, computeSegmentsParameters))

export {
    computeSegments,
}
