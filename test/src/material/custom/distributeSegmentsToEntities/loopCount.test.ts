import { Cardinal, to } from '@musical-patterns/utilities'
import { computeLoopCount } from '../../../../../src/indexForTest'

describe('loop count', () => {
    it(
        `is equal to the LCM of the entity count and the cycle length, divided by the cycle length - \
because this is how many loops of the segments are necessary until each entity will realign with its original notes index within the segments`,
        () => {
            const entityCount: Cardinal = to.Cardinal(3)
            const cycleLength: Cardinal = to.Cardinal(5)

            const actualLoopCount: Cardinal = computeLoopCount({ entityCount, cycleLength })

            expect(actualLoopCount)
                .toBe(to.Cardinal(3))
        },
    )

    it('works in situations where the entity count and cycle length share a factor other than themselves', () => {
        const entityCount: Cardinal = to.Cardinal(4)
        const cycleLength: Cardinal = to.Cardinal(6)

        const actualLoopCount: Cardinal = computeLoopCount({ entityCount, cycleLength })

        expect(actualLoopCount)
            .toBe(to.Cardinal(2))
    })
})
