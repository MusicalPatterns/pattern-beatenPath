import { to } from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from '../../../src/indexForTest'

describe('duration indices', () => {
    it('first entity', () => {
        expect(firstPartDurationIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(0))
        expect(firstPartDurationIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(0))
        expect(firstPartDurationIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(2))
        expect(firstPartDurationIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(2))
        expect(firstPartDurationIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(4))
        expect(firstPartDurationIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(4))
    })

    it('second entity', () => {
        expect(secondPartDurationIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(-1))
        expect(secondPartDurationIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(1))
        expect(secondPartDurationIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(1))
        expect(secondPartDurationIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(3))
        expect(secondPartDurationIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(3))
        expect(secondPartDurationIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(5))
    })
})
