import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { apply, Cardinal, INITIAL, NEXT, Ordinal, Translation } from '@musical-patterns/utilities'
import { distributeSegmentNotesToEntities } from './distributeSegmentNotesToEntities'
import { computeInitialEmptyEntitiesNotes } from './initialEmptyEntitiesNotes'
import { computeLoopCount } from './loopCount'
import { computeLoopCycledSegmentSegments } from './loopCycledSegmentSegments'
import { computeLoopSegmentCycleTranslations } from './loopSegmentCycleTranslations'
import { computeSegmentsDimensions } from './segmentsDimensions'
import { SegmentsDimensions } from './types'

const computeEntitiesNotesFromSegments: (segments: Segment[]) => Note[][] =
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

            populatedEntitiesNotes = distributeSegmentNotesToEntities({
                existingEntitiesNotes: populatedEntitiesNotes,
                segments: loopCycledSegmentSegments,
            })
        }

        return populatedEntitiesNotes
    }

export {
    computeEntitiesNotesFromSegments,
}
