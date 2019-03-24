import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    arraySet,
    Cardinal,
    deepClone,
    forEach,
    INITIAL,
    NEXT,
    Ordinal,
    sequence,
    Translation,
} from '@musical-patterns/utilities'
import { computeInitialEmptyEntitiesNotes } from './initialEmptyEntitiesNotes'
import { computeLoopCount } from './loopCount'
import { computeLoopCycledSegmentSegments } from './loopCycledSegmentSegments'
import { computeLoopSegmentCycleTranslations } from './loopSegmentCycleTranslations'
import { computeSegmentsDimensions } from './segmentsDimensions'
import { DistributeSegmentToEntitiesParameters, SegmentsDimensions } from './types'

const distributeSegmentToEntities: (parameters: DistributeSegmentToEntitiesParameters) => Note[][] =
    ({ segments, existingEntitiesNotes }: DistributeSegmentToEntitiesParameters): Note[][] => {
        const populatedEntitiesNotes: Note[][] = deepClone(existingEntitiesNotes)

        segments.forEach((segment: Segment): void => {
            forEach(
                segment,
                (notes: Note[], entityIndex: Ordinal): void => {
                    arraySet(
                        populatedEntitiesNotes,
                        entityIndex,
                        sequence(
                            populatedEntitiesNotes[ entityIndex ],
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
        const loopCount: Cardinal = computeLoopCount(segmentsDimensions)
        const loopSegmentCycleTranslations: Translation = computeLoopSegmentCycleTranslations(segmentsDimensions)

        for (
            let loopIndex: Ordinal = INITIAL;
            loopIndex < loopCount;
            loopIndex = apply.Translation(loopIndex, NEXT)
        ) {
            const loopCycledSegmentSegments: Segment[] = computeLoopCycledSegmentSegments({
                loopIndex,
                loopSegmentCycleTranslations,
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
