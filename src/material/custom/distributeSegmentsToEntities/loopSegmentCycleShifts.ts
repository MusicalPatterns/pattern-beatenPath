import { Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, Cycle, insteadOf, negative, use } from '@musical-patterns/utilities'
import { LoopSegmentCycleShift, SegmentsDimensions } from './types'

const computeLoopSegmentCycleShift: (parameters: {
    cycleLength: Cardinal<Segment[]>,
    entityCount: Cardinal<Entity[]>,
}) => LoopSegmentCycleShift =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleShift =>
        insteadOf<Cardinal, Cycle<Note[]>>(negative(use.Remaindee(
            cycleLength,
            as.Remaindee<Cardinal<Segment[]>>(as.number(entityCount)),
        )))

export {
    computeLoopSegmentCycleShift,
}
