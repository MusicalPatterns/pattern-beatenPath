import { Note } from '@musical-patterns/compiler'
import { computeNotesTotalDurationByScalar, Segment } from '@musical-patterns/pattern'
import { apply, deepClone, difference, finalElement, forEach, max, Ordinal, to } from '@musical-patterns/utilities'
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

                const equalizedSegment: Segment = apply.Ordinal(equalizedSegments, segmentIndex)
                const equalizedNotes: Note[] = apply.Ordinal(equalizedSegment, notesIndex)
                const equalizedNote: Note = finalElement(equalizedNotes)
                // tslint:disable-next-line no-non-null-assertion
                equalizedNote.duration!.scalar = apply.Translation(
                // tslint:disable-next-line no-non-null-assertion
                    equalizedNote.duration!.scalar,
                    to.Translation(neededAdjustment),
                )
            })
        })

        return equalizedSegments
    }

export {
    equalizeDurationsOfSegmentNotes,
}
