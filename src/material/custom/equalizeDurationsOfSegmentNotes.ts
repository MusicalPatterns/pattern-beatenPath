import { Note } from '@musical-patterns/compiler'
import {
    computeNotesTotalDurationByScalar,
    Segment,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
} from '@musical-patterns/pattern'
import {
    Amplitude,
    apply,
    deepClone,
    difference,
    forEach,
    from,
    max,
    Ordinal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from '../constants'
import { ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION } from './constants'

const equalizeDurationsOfSegmentNotes: (segments: Segment[]) => Segment[] =
    (segments: Segment[]): Segment[] => {
        const equalizedSegments: Segment[] = deepClone(segments)

        forEach(segments, (segment: Segment, segmentIndex: Ordinal) => {
            const notesDurations: number[] = segment.map(computeNotesTotalDurationByScalar)
            const maxNotesDuration: number = max(...notesDurations)
            const neededAdjustments: number[] = notesDurations.map((notesDuration: number) =>
                difference(maxNotesDuration, notesDuration))

            forEach(neededAdjustments, (neededAdjustment: number, notesIndex: Ordinal) => {
                if (neededAdjustment <=
                    ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION) {
                    return
                }
                const neededAdjustmentNote: Note = {
                    duration: {
                        scalar: to.Scalar(neededAdjustment),
                        scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                    },
                    gain: {
                        scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(SILENT),
                    },
                    sustain: {
                        scalar: apply.Scalar(to.Scalar(neededAdjustment), SUSTAIN_AMOUNT),
                        scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                    },
                }

                const equalizedSegment: Segment = apply.Ordinal(equalizedSegments, segmentIndex)
                const equalizedNotes: Note[] = apply.Ordinal(equalizedSegment, notesIndex)
                equalizedNotes.push(neededAdjustmentNote)
            })
        })

        return equalizedSegments
    }

export {
    equalizeDurationsOfSegmentNotes,
}
