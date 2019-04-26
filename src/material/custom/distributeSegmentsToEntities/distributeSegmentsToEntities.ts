import { Note, Segment } from '@musical-patterns/material'
import {
    arraySet,
    as,
    Cardinal,
    deepClone,
    forEach,
    INCREMENT,
    INITIAL,
    Ordinal,
    sequence,
    use,
} from '@musical-patterns/utilities'
import { computeInitialEmptyEntitiesNotes } from './initialEmptyEntitiesNotes'
import { computeLoopCount } from './loopCount'
import { computeLoopCycledSegmentSegments } from './loopCycledSegmentSegments'
import { computeLoopSegmentCycleShift } from './loopSegmentCycleShifts'
import { computeSegmentsDimensions } from './segmentsDimensions'
import { DistributeSegmentToEntitiesParameters, LoopSegmentCycleShift, SegmentsDimensions } from './types'

const distributeSegmentToEntities: (parameters: { existingEntitiesNotes: Note[][], segments: Segment[] }) => Note[][] =
    ({ segments, existingEntitiesNotes }: DistributeSegmentToEntitiesParameters): Note[][] => {
        const populatedEntitiesNotes: Note[][] = deepClone(existingEntitiesNotes)

        segments.forEach((segment: Segment): void => {
            forEach(
                segment,
                (notes: Note[], notesIndex: Ordinal<Segment>): void => {
                    arraySet(
                        populatedEntitiesNotes,
                        notesIndex,
                        sequence(
                            use.Ordinal(populatedEntitiesNotes, notesIndex),
                            notes,
                        ),
                    )
                })
        })

        return populatedEntitiesNotes
    }

const distributeSegmentsToEntities: (segments: Segment[]) => Note[][] =
    (segments: Segment[]): Note[][] => {
        const segmentsDimensions: SegmentsDimensions = computeSegmentsDimensions(segments)

        let populatedEntitiesNotes: Note[][] = computeInitialEmptyEntitiesNotes(segmentsDimensions)
        const loopCount: Cardinal<LoopSegmentCycleShift> = computeLoopCount(segmentsDimensions)
        const loopSegmentCycleShift: LoopSegmentCycleShift =
            computeLoopSegmentCycleShift(segmentsDimensions)

        for (
            let loopIndex: Ordinal<LoopSegmentCycleShift[]> = INITIAL;
            loopIndex < as.Ordinal<LoopSegmentCycleShift[]>(as.number(loopCount));
            loopIndex = use.Cardinal(loopIndex, INCREMENT)
        ) {
            const loopCycledSegmentSegments: Segment[] = computeLoopCycledSegmentSegments({
                loopIndex,
                loopSegmentCycleShift,
                segments,
            })

            populatedEntitiesNotes = distributeSegmentToEntities({
                existingEntitiesNotes: populatedEntitiesNotes,
                segments: loopCycledSegmentSegments,
            })
        }

        return populatedEntitiesNotes
    }

export {
    distributeSegmentsToEntities,
}
