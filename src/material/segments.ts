import { NoteSpec } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    Cardinal,
    indexOfLastElement,
    INITIAL,
    Ordinal,
    positiveIntegers,
    Scalar,
    slice,
    to,
} from '@musical-patterns/utilities'
import { calculateDurationScalars, calculateNoteCounts } from '../custom'
import { BeatenPathStyle } from '../types'
import { buildNoteSpec } from './notes'
import { buildPolyrhythmicPiece, buildSmoothPiece } from './pieces'
import { BuildPiece, BuildSegmentsParameters } from './types'

const buildSegment: (segmentIndex: Ordinal, buildSegmentsParameters: BuildSegmentsParameters) => Segment =
    (segmentIndex: Ordinal, { durations, ratios, repetitions, style }: BuildSegmentsParameters): Segment => {
        const durationScalars: Scalar[] = calculateDurationScalars({ durations, segmentIndex })
        const noteCounts: Cardinal[] = calculateNoteCounts({ ratios, segmentIndex })

        const buildPiece: BuildPiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? buildPolyrhythmicPiece : buildSmoothPiece

        return durationScalars.map((durationScalar: Scalar, index: number): NoteSpec[] =>
            buildPiece({
                durationScalar,
                notesCount: noteCounts[ index ],
                repetitions,
            })
                .map(buildNoteSpec))
    }

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    (buildSegmentsParameters: BuildSegmentsParameters): Segment[] =>
        slice(positiveIntegers, INITIAL, indexOfLastElement(buildSegmentsParameters.durations))
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment =>
                buildSegment(segmentIndex, buildSegmentsParameters))

export {
    buildSegments,
}
