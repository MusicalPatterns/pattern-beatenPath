import { Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, Cycle, negative, notAs, use } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopSegmentCycleTranslation: (parameters: {
    cycleLength: Cardinal<Segment>,
    entityCount: Cardinal<Entity>,
}) => LoopSegmentCycleTranslation =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleTranslation =>
        as.Translation<Cycle<Note[]>>(notAs.Cardinal(negative(use.Modulus(
            cycleLength,
            as.IntegerModulus<Cardinal<Segment>>(notAs.Cardinal(entityCount)),
        ))))

export {
    computeLoopSegmentCycleTranslation,
}
