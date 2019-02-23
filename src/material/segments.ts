import { NoteSpec } from '@musical-patterns/compiler'
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
import { BeatenPathStyle } from '../types'
import { calculateDurationScalars, calculateNoteCounts } from './custom'
import { buildNoteSpec } from './notes'
import { buildPolyrhythmicPiece, buildSmoothPiece } from './pieces'
import { BuildPiece, BuildSegmentsParameters } from './types'

const buildSegment: (segmentIndex: Ordinal, buildSegmentsParameters: BuildSegmentsParameters) => Segment =
    (segmentIndex: Ordinal, { durations, ratios, repetitions, style }: BuildSegmentsParameters): Segment => {
        const durationScalars: Scalar[] = calculateDurationScalars({ durations, segmentIndex })
        const noteCounts: Cardinal[] = calculateNoteCounts({ ratios, segmentIndex })

        const buildPiece: BuildPiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? buildPolyrhythmicPiece : buildSmoothPiece

        return map(durationScalars, (durationScalar: Scalar, index: Ordinal): NoteSpec[] =>
            buildPiece({
                durationScalar,
                notesCount: apply.Ordinal(noteCounts, index),
                repetitions,
            })
                .map(buildNoteSpec))
    }

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    (buildSegmentsParameters: BuildSegmentsParameters): Segment[] =>
        slice(zeroAndPositiveIntegers, INITIAL, indexOfLastElement(buildSegmentsParameters.durations))
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment =>
                buildSegment(segmentIndex, buildSegmentsParameters))

export {
    buildSegments,
}
