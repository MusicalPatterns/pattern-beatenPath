import { Note, Segment } from '@musical-patterns/material'
import {
    arraySet,
    as,
    Cardinal,
    deepClone,
    forEach,
    INCREMENT,
    INITIAL,
    notAs,
    Ordinal,
    sequence,
    use,
} from '@musical-patterns/utilities'
import { computeInitialEmptyEntitiesNotes } from './initialEmptyEntitiesNotes'
import { computeLoopCount } from './loopCount'
import { computeLoopCycledSegmentSegments } from './loopCycledSegmentSegments'
import { computeLoopSegmentCycleTranslation } from './loopSegmentCycleTranslations'
import { computeSegmentsDimensions } from './segmentsDimensions'
import { DistributeSegmentToEntitiesParameters, LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const distributeSegmentToEntities: (parameters: { existingEntitiesNotes: Note[][], segments: Segment[] }) => Note[][] =
    ({ segments, existingEntitiesNotes }: DistributeSegmentToEntitiesParameters): Note[][] => {
        const populatedEntitiesNotes: Note[][] = deepClone(existingEntitiesNotes)

        segments.forEach((segment: Segment): void => {
            forEach(
                segment,
                (notes: Note[], notesIndex: Ordinal<Note[]>): void => {
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
        const loopCount: Cardinal<LoopSegmentCycleTranslation> = computeLoopCount(segmentsDimensions)
        const loopSegmentCycleTranslation: LoopSegmentCycleTranslation =
            computeLoopSegmentCycleTranslation(segmentsDimensions)

        for (
            let loopIndex: Ordinal<LoopSegmentCycleTranslation> = INITIAL;
            loopIndex < as.Ordinal<LoopSegmentCycleTranslation>(notAs.Cardinal<LoopSegmentCycleTranslation>(loopCount));
            loopIndex = use.Translation(loopIndex, INCREMENT)
        ) {
            const loopCycledSegmentSegments: Segment[] = computeLoopCycledSegmentSegments({
                loopIndex,
                loopSegmentCycleTranslation,
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
