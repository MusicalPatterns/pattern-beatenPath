import { Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, Cycle, insteadOf, negative,  use } from '@musical-patterns/utilities'
import { LoopSegmentCycleShift, SegmentsDimensions } from './types'

const computeLoopSegmentCycleShift: (parameters: {
    cycleLength: Cardinal<Segment[]>,
    entityCount: Cardinal<Entity[]>,
}) => LoopSegmentCycleShift =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleShift =>
        insteadOf<Cardinal, Cycle<Note[]>>(negative(use.IntegerModulus(
            cycleLength,
            as.IntegerModulus<Cardinal<Segment[]>>(as.number(entityCount)),
        )))

export {
    computeLoopSegmentCycleShift,
}
