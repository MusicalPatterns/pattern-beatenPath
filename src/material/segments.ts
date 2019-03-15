import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    indexJustBeyondLastElement,
    INITIAL,
    map,
    Ordinal,
    Scalar,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'
import {
    computeCoreCycles,
    computeSegmentDurationIndices,
    computeSegmentNoteCounts,
    equalizeDurationsOfSegmentNotes,
} from './custom'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputePiece, ComputeSegmentParameters, ComputeSegmentsParameters } from './types'

const computeSegment: (computeSegmentsParameters: ComputeSegmentParameters) => Segment =
    (parameters: ComputeSegmentParameters): Segment => {
        const { segmentIndex, coreDurations, coreIntervals, repetitions, style, entityCount } = parameters

        const segmentDurationIndices: Ordinal[] = computeSegmentDurationIndices({ segmentIndex, entityCount })
        const segmentNoteCounts: Cardinal[] = computeSegmentNoteCounts({
            coreIntervals,
            entityCount,
            segmentDurationIndices,
            segmentIndex,
        })

        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        const segmentDurations: Scalar[] = segmentDurationIndices.map((scalarIndex: Ordinal) =>
            apply.Ordinal(coreDurations, scalarIndex))

        return map(segmentDurations, (notesDuration: Scalar, index: Ordinal): Note[] => {
            const notesCount: Cardinal = apply.Ordinal(segmentNoteCounts, index)

            return computePiece({
                notesCount,
                notesDuration,
                repetitions,
            })
                .map(computeNote)
        })
    }

const computeSegments: (computeSegmentsParameters: ComputeSegmentsParameters) => Segment[] =
    ({ core, entityCount, repetitions, style }: ComputeSegmentsParameters): Segment[] => {
        const { coreDurations, coreIntervals } = computeCoreCycles(core)

        const indexOfFirstElementAgainWrappingAroundTheCycle: Ordinal =
            indexJustBeyondLastElement(coreDurations)

        const segments: Segment[] = slice(
            zeroAndPositiveIntegers,
            INITIAL,
            indexOfFirstElementAgainWrappingAroundTheCycle,
        )
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment =>
                computeSegment({ segmentIndex, entityCount, coreIntervals, repetitions, coreDurations, style }),
            )

        return equalizeDurationsOfSegmentNotes(segments)
    }

export {
    computeSegments,
}
