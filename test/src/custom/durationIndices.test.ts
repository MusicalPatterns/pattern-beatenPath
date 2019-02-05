import { to } from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from '../../../src/indexForTest'

describe('duration indices', () => {
    it('first entity', () => {
        expect(firstPartDurationIndex(to.Index(0)))
            .toBe(to.Index(0))
        expect(firstPartDurationIndex(to.Index(1)))
            .toBe(to.Index(0))
        expect(firstPartDurationIndex(to.Index(2)))
            .toBe(to.Index(2))
        expect(firstPartDurationIndex(to.Index(3)))
            .toBe(to.Index(2))
        expect(firstPartDurationIndex(to.Index(4)))
            .toBe(to.Index(4))
        expect(firstPartDurationIndex(to.Index(5)))
            .toBe(to.Index(4))
    })

    it('second entity', () => {
        expect(secondPartDurationIndex(to.Index(0)))
            .toBe(to.Index(-1))
        expect(secondPartDurationIndex(to.Index(1)))
            .toBe(to.Index(1))
        expect(secondPartDurationIndex(to.Index(2)))
            .toBe(to.Index(1))
        expect(secondPartDurationIndex(to.Index(3)))
            .toBe(to.Index(3))
        expect(secondPartDurationIndex(to.Index(4)))
            .toBe(to.Index(3))
        expect(secondPartDurationIndex(to.Index(5)))
            .toBe(to.Index(5))
    })
})
