import { Entity, Note, Segment } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    Cycle,
    Fraction,
    indexJustBeyondFinalElement,
    insteadOf,
    Integer,
    map,
    Ordinal,
    range,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { Core, Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { PieceLength } from '../types'
import {
    computeCoreCycles,
    computeSegmentPieceLengths,
    computeSegmentValueIndices,
    equalizeValuesOfSegmentNotes,
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
            coreDurations,
            coreIntervals,
            entityCount,
            repetitions,
            segmentIndex,
            style,
        }: ComputeSegmentParameters,
    ): Segment => {
        const segmentValueIndices: Array<Ordinal<Scalar[]>> =
            computeSegmentValueIndices({ segmentIndex, entityCount })
        const segmentPieceLengths: PieceLength[] = computeSegmentPieceLengths({
            coreIntervals,
            entityCount,
            segmentIndex,
            segmentValueIndices,
        })

        const segmentValues: Scalar[] = segmentValueIndices.map((segmentValueIndex: Ordinal<Scalar[]>) =>
            use.Ordinal(coreDurations, segmentValueIndex),
        )

        return map(segmentValues, (notesValue: Scalar, index: Ordinal<Scalar[]>): Note[] => {
            const pieceLength: PieceLength = use.Ordinal(
                segmentPieceLengths,
                insteadOf<Ordinal, PieceLength[]>(index),
            )

            return computeNotes({ pieceLength, notesValue, repetitions, style })
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

        const segments: Segment[] = range(indexOfFirstElementAgainWrappingAroundTheCycle)
            .map((integer: Integer) => as.Ordinal<Segment[]>(integer))
            .map((segmentIndex: Ordinal<Segment[]>): Segment =>
                computeSegment({ segmentIndex, entityCount, coreIntervals, repetitions, coreDurations, style }),
            )

        return equalizeValuesOfSegmentNotes(segments)
    }

export {
    computeSegments,
}
