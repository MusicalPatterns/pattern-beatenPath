import { Entity, Note, Segment } from '@musical-patterns/material'
import { Cycle, negative, to } from '@musical-patterns/utilities'
import { computeLoopSegmentCycleTranslation, LoopSegmentCycleTranslation } from '../../../../../src/indexForTest'

describe('loop segment cycle translation', () => {
    it(
        `tells you - for each time you loop over the segments - \
how much to translate (cycle) each segment's array of notes (treating them as a cycle) \
and the answer is the modulus of the cycle length with the entity count, \
except that it's negative because you're effectively cycling the segments toward the entities rather than \
what i would think the more natural direction would be, to cycle the entities toward their destination notes`,
        () => {
            const actualLoopSegmentCycleTranslations: LoopSegmentCycleTranslation = computeLoopSegmentCycleTranslation({
                cycleLength: to.Cardinal<Segment>(44),
                entityCount: to.Cardinal<Entity>(3),
            })

            expect(actualLoopSegmentCycleTranslations)
                .toBe(to.Translation<Cycle<Note[]>>(negative(2)))
        },
    )
})
