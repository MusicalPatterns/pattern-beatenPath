import { to } from '@musical-patterns/utilities'
import { firstPartScalarIndex, secondPartScalarIndex } from '../../../../src/indexForTest'

describe('scalar indices', () => {
    it('first entity', () => {
        expect(firstPartScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(1))
        expect(firstPartScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(1))
        expect(firstPartScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(3))
        expect(firstPartScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(3))
        expect(firstPartScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(5))
        expect(firstPartScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(5))
    })

    it('second entity', () => {
        expect(secondPartScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(0))
        expect(secondPartScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(2))
        expect(secondPartScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(2))
        expect(secondPartScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(4))
        expect(secondPartScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(4))
        expect(secondPartScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(6))
    })
})
