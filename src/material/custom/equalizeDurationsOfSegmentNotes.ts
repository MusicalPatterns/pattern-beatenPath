import { computeNotesTotalDurationByScalar, Note, Segment } from '@musical-patterns/material'
import {
    apply,
    deepClone,
    difference,
    finalElement,
    forEach,
    insteadOf,
    max,
    Ordinal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION } from './constants'

const equalizeDurationsOfSegmentNotes: (segments: Segment[]) => Segment[] =
    (segments: Segment[]): Segment[] => {
        const equalizedSegments: Segment[] = deepClone(segments)

        forEach(segments, (segment: Segment, segmentIndex: Ordinal<Segment>) => {
            const notesDurations: number[] = segment.map(computeNotesTotalDurationByScalar)
            const maxNotesDuration: number = max(...notesDurations)
            const neededAdjustments: number[] = notesDurations.map((notesDuration: number) =>
                difference(maxNotesDuration, notesDuration))

            forEach(neededAdjustments, (neededAdjustment: number, notesIndex: Ordinal) => {
                if (neededAdjustment <=
                    ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION) {
                    return
                }

                const equalizedSegment: Segment = apply.Ordinal(
                    equalizedSegments,
                    segmentIndex,
                )
                const equalizedNotes: Note[] = apply.Ordinal(
                    equalizedSegment,
                    insteadOf<Ordinal, Note[]>(notesIndex),
                )
                const equalizedNote: Note = finalElement(equalizedNotes)
                // tslint:disable-next-line no-non-null-assertion
                equalizedNote.duration!.scalar = apply.Translation(
                    // tslint:disable-next-line no-non-null-assertion
                    equalizedNote.duration!.scalar,
                    to.Translation<Scalar<Scalar>>(neededAdjustment),
                )
            })
        })

        return equalizedSegments
    }

export {
    equalizeDurationsOfSegmentNotes,
}
