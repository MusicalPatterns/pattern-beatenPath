import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, to } from '@musical-patterns/utilities'
import { computeLoopCount, LoopSegmentCycleTranslation } from '../../../../../src/indexForTest'

describe('loop count', () => {
    it(
        `is equal to the LCM of the entity count and the cycle length, divided by the cycle length - \
because this is how many loops of the segments are necessary until each entity will realign with its original notes index within the segments`,
        () => {
            const entityCount: Cardinal<Entity> = to.Cardinal<Entity>(3)
            const cycleLength: Cardinal<Segment> = to.Cardinal<Segment>(5)

            const actualLoopCount: Cardinal<LoopSegmentCycleTranslation> = computeLoopCount({ entityCount, cycleLength })

            expect(actualLoopCount)
                .toBe(to.Cardinal<LoopSegmentCycleTranslation>(3))
        },
    )

    it('works in situations where the entity count and cycle length share a factor other than themselves', () => {
        const entityCount: Cardinal<Entity> = to.Cardinal<Entity>(4)
        const cycleLength: Cardinal<Segment> = to.Cardinal<Segment>(6)

        const actualLoopCount: Cardinal<LoopSegmentCycleTranslation> = computeLoopCount({ entityCount, cycleLength })

        expect(actualLoopCount)
            .toBe(to.Cardinal<LoopSegmentCycleTranslation>(2))
    })
})
