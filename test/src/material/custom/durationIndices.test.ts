import { to } from '@musical-patterns/utilities'
import { computeFirstEntityScalarIndex, computeSecondEntityScalarIndex } from '../../../../src/indexForTest'

describe('scalar indices', () => {
    it('first entity', () => {
        expect(computeFirstEntityScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(1))
        expect(computeFirstEntityScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(1))
        expect(computeFirstEntityScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(3))
        expect(computeFirstEntityScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(3))
        expect(computeFirstEntityScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(5))
        expect(computeFirstEntityScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(5))
    })

    it('second entity', () => {
        expect(computeSecondEntityScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(0))
        expect(computeSecondEntityScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(2))
        expect(computeSecondEntityScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(2))
        expect(computeSecondEntityScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(4))
        expect(computeSecondEntityScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(4))
        expect(computeSecondEntityScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(6))
    })
})
