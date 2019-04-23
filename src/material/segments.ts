import { Entity, Note, PitchDuration, Segment } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    ContourPiece,
    Cycle,
    Fraction,
    indexJustBeyondFinalElement,
    INITIAL,
    insteadOf,
    Integer,
    map,
    Ordinal,
    Scalar,
    slice,
    use,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { Core, Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import {
    computeCoreCycles,
    computeSegmentDurationIndices,
    computeSegmentPieceLengths,
    equalizeDurationsOfSegmentNotes,
} from './custom'
import { computeNotes } from './notes'
import { ComputeSegmentParameters, ComputeSegmentsParameters } from './types'

const computeSegment: (computeSegmentsParameters: {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    repetitions: Cardinal<Repetition[]>,
    segmentIndex: Ordinal<Segment[]>,
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
        const segmentDurationIndices: Array<Ordinal<Scalar[]>> =
            computeSegmentDurationIndices({ segmentIndex, entityCount })
        const segmentPieceLengths: Array<Cardinal<ContourPiece<PitchDuration>>> = computeSegmentPieceLengths({
            coreIntervals,
            entityCount,
            segmentDurationIndices,
            segmentIndex,
        })

        const segmentDurations: Scalar[] = segmentDurationIndices.map((segmentDurationIndex: Ordinal<Scalar[]>) =>
            use.Ordinal(coreDurations, segmentDurationIndex),
        )

        return map(segmentDurations, (notesDuration: Scalar, index: Ordinal<Scalar[]>): Note[] => {
            const contourLength: Cardinal<ContourPiece<PitchDuration>> = use.Ordinal(
                segmentPieceLengths,
                insteadOf<Ordinal, Array<Cardinal<ContourPiece<PitchDuration>>>>(index),
            )

            return computeNotes({ contourLength, notesDuration, repetitions, style })
        })
    }

const computeSegments: (computeSegmentsParameters: {
    core: Core,
    entityCount: Cardinal<Entity[]>,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}) => Segment[] =
    ({ core, entityCount, repetitions, style }: ComputeSegmentsParameters): Segment[] => {
        const { coreDurations, coreIntervals } = computeCoreCycles(core)

        const indexOfFirstElementAgainWrappingAroundTheCycle: Ordinal<Scalar[]> =
            indexJustBeyondFinalElement(coreDurations)

        const segments: Segment[] = slice(
            ZERO_AND_POSITIVE_INTEGERS,
            INITIAL,
            indexOfFirstElementAgainWrappingAroundTheCycle,
        )
            .map((integer: Integer) => as.Ordinal<Segment[]>(integer))
            .map((segmentIndex: Ordinal<Segment[]>): Segment =>
                computeSegment({ segmentIndex, entityCount, coreIntervals, repetitions, coreDurations, style }),
            )

        return equalizeDurationsOfSegmentNotes(segments)
    }

export {
    computeSegments,
}
