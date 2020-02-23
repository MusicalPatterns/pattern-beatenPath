import { Entity, Segment } from '@musical-patterns/material'
import { as, Cardinal } from '@musical-patterns/utilities'
import { computeLoopCount, LoopSegmentCycleShift } from '../../../../../src/indexForTest'

describe('loop count', (): void => {
    it(
        `is equal to the LCM of the entity count and the cycle length, divided by the cycle length - \
because this is how many loops of the segments are necessary until each entity will realign with its original notes index within the segments`,
        (): void => {
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)
            const cycleLength: Cardinal<Segment[]> = as.Cardinal<Segment[]>(5)

            const actualLoopCount: Cardinal<LoopSegmentCycleShift> = computeLoopCount({
                cycleLength,
                entityCount,
            })

            expect(actualLoopCount)
                .toBe(as.Cardinal<LoopSegmentCycleShift>(3))
        },
    )

    it('works in situations where the entity count and cycle length share a factor other than themselves', (): void => {
        const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(4)
        const cycleLength: Cardinal<Segment[]> = as.Cardinal<Segment[]>(6)

        const actualLoopCount: Cardinal<LoopSegmentCycleShift> = computeLoopCount({ entityCount, cycleLength })

        expect(actualLoopCount)
            .toBe(as.Cardinal<LoopSegmentCycleShift>(2))
    })
})
