import { Note } from '@musical-patterns/material'
import { apply, Cardinal, Cycle, from, negative, ofFrom, to } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopSegmentCycleTranslation: (parameters: {
    cycleLength: Cardinal,
    entityCount: Cardinal,
}) => LoopSegmentCycleTranslation =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleTranslation =>
        to.Translation<Cycle<Note[]>>(from.Cardinal(negative(apply.Modulus(
            cycleLength,
            to.IntegerModulus(ofFrom(entityCount)),
        ))))

export {
    computeLoopSegmentCycleTranslation,
}
