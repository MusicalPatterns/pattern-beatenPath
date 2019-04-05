import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    Cycle,
    Fraction,
    indexJustBeyondFinalElement,
    INITIAL,
    map,
    Ordinal,
    Scalar,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { Core } from '../nominals'
import { BeatenPathStyle } from '../spec'
import {
    computeCoreCycles,
    computeSegmentDurationIndices,
    computeSegmentNoteCounts,
    equalizeDurationsOfSegmentNotes,
} from './custom'
import { computeNotes } from './notes'
import { ComputeSegmentParameters, ComputeSegmentsParameters } from './types'

const computeSegment: (computeSegmentsParameters: {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal,
    repetitions: Cardinal,
    segmentIndex: Ordinal,
    style: BeatenPathStyle,
}) => Segment =
    (
        {
            segmentIndex,
            coreDurations,
            coreIntervals,
            repetitions,
            style,
            entityCount,
        }: ComputeSegmentParameters,
    ): Segment => {
        const segmentDurationIndices: Ordinal[] = computeSegmentDurationIndices({ segmentIndex, entityCount })
        const segmentNoteCounts: Cardinal[] = computeSegmentNoteCounts({
            coreIntervals,
            entityCount,
            segmentDurationIndices,
            segmentIndex,
        })

        const segmentDurations: Scalar[] = segmentDurationIndices.map((scalarIndex: Ordinal) =>
            apply.Ordinal(coreDurations, scalarIndex))

        return map(segmentDurations, (notesDuration: Scalar, index: Ordinal): Note[] => {
            const notesCount: Cardinal = apply.Ordinal(segmentNoteCounts, index)

            return computeNotes({ notesCount, notesDuration, repetitions, style })
        })
    }

const computeSegments: (computeSegmentsParameters: {
    core: Core,
    entityCount: Cardinal,
    repetitions: Cardinal,
    style: BeatenPathStyle,
}) => Segment[] =
    ({ core, entityCount, repetitions, style }: ComputeSegmentsParameters): Segment[] => {
        const { coreDurations, coreIntervals } = computeCoreCycles(core)

        const indexOfFirstElementAgainWrappingAroundTheCycle: Ordinal =
            indexJustBeyondFinalElement(coreDurations)

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
