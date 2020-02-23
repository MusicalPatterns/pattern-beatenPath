import { computeNotesValueScalarSum, Note, Segment } from '@musical-patterns/material'
import {
    as,
    deepClone,
    difference,
    finalElement,
    forEach,
    insteadOf,
    max,
    Ordinal,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION } from './constants'

const equalizeValuesOfSegmentNotes: (segments: Segment[]) => Segment[] =
    (segments: Segment[]): Segment[] => {
        const equalizedSegments: Segment[] = deepClone(segments)

        forEach(segments, (segment: Segment, segmentIndex: Ordinal<Segment[]>): void => {
            const notesValues: number[] = segment.map(computeNotesValueScalarSum)
            const maxNotesValue: number = max(...notesValues)
            const neededAdjustments: number[] = notesValues.map((notesValue: number): number =>
                difference(maxNotesValue, notesValue))

            forEach(neededAdjustments, (neededAdjustment: number, notesIndex: Ordinal): void => {
                if (neededAdjustment <=
                    ADJUSTMENT_SIZE_BELOW_WHICH_IT_MATTERS_NOT_AND_BREAKS_THE_TOTAL_DURATION_CALCULATION) {
                    return
                }

                const equalizedSegment: Segment = use.Ordinal(
                    equalizedSegments,
                    segmentIndex,
                )
                const equalizedNotes: Note[] = use.Ordinal(
                    equalizedSegment,
                    insteadOf<Ordinal, Note[][]>(notesIndex),
                )
                const equalizedNote: Note = finalElement(equalizedNotes)
                // tslint:disable-next-line no-non-null-assertion
                equalizedNote.value!.scalar = use.Translation(
                    // tslint:disable-next-line no-non-null-assertion
                    equalizedNote.value!.scalar!,
                    as.Translation<Scalar<Value>>(neededAdjustment),
                )
            })
        })

        return equalizedSegments
    }

export {
    equalizeValuesOfSegmentNotes,
}
