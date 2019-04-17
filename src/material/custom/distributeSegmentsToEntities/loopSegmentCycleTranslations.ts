import { Note } from '@musical-patterns/material'
import { apply, Cycle, negative, to } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopSegmentCycleTranslation: (parameters: SegmentsDimensions) => LoopSegmentCycleTranslation =
    ({ cycleLength, entityCount }: SegmentsDimensions): LoopSegmentCycleTranslation =>
        to.Translation<Cycle<Note[]>>(negative(apply.Modulus(
            cycleLength,
            to.Modulus(entityCount),
        )))

export {
    computeLoopSegmentCycleTranslation,
}
