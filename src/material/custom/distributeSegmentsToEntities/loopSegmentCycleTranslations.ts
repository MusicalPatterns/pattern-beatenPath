import { Entity, Note, Segment } from '@musical-patterns/material'
import { apply, Cardinal, Cycle, from, negative, to } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopSegmentCycleTranslation: (parameters: {
    cycleLength: Cardinal<Segment>,
    entityCount: Cardinal<Entity>,
}) => LoopSegmentCycleTranslation =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleTranslation =>
        to.Translation<Cycle<Note[]>>(from.Cardinal(negative(apply.Modulus(
            cycleLength,
            to.IntegerModulus<Cardinal<Segment>>(from.Cardinal(entityCount)),
        ))))

export {
    computeLoopSegmentCycleTranslation,
}
