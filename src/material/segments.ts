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
import { BeatenPathStyle } from '../spec'
import { calculateNoteCounts, calculateScalars } from './custom'
import { buildNoteSpec } from './notes'
import { buildPolyrhythmicPiece, buildSmoothPiece } from './pieces'
import { BuildPiece, BuildSegmentsParameters } from './types'

const buildSegment: (segmentIndex: Ordinal, buildSegmentsParameters: BuildSegmentsParameters) => Segment =
    (segmentIndex: Ordinal, { scalars, fractions, repetitions, style }: BuildSegmentsParameters): Segment => {
        const scalarScalars: Scalar[] = calculateScalars({ scalars, segmentIndex })
        const noteCounts: Cardinal[] = calculateNoteCounts({ fractions, segmentIndex })

        const buildPiece: BuildPiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? buildPolyrhythmicPiece : buildSmoothPiece

        return map(scalarScalars, (scalar: Scalar, index: Ordinal): NoteSpec[] =>
            buildPiece({
                notesCount: apply.Ordinal(noteCounts, index),
                repetitions,
                scalar,
            })
                .map(buildNoteSpec))
    }

const buildSegments: (buildSegmentsParameters: BuildSegmentsParameters) => Segment[] =
    (buildSegmentsParameters: BuildSegmentsParameters): Segment[] =>
        slice(zeroAndPositiveIntegers, INITIAL, indexOfLastElement(buildSegmentsParameters.scalars))
            .map(to.Ordinal)
            .map((segmentIndex: Ordinal): Segment =>
                buildSegment(segmentIndex, buildSegmentsParameters))

export {
    buildSegments,
}
