import { to } from '@musical-patterns/utilities'
import { calculateFirstEntityScalarIndex, calculateSecondEntityScalarIndex } from '../../../../src/indexForTest'

describe('scalar indices', () => {
    it('first entity', () => {
        expect(calculateFirstEntityScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(1))
        expect(calculateFirstEntityScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(1))
        expect(calculateFirstEntityScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(3))
        expect(calculateFirstEntityScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(3))
        expect(calculateFirstEntityScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(5))
        expect(calculateFirstEntityScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(5))
    })

    it('second entity', () => {
        expect(calculateSecondEntityScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(0))
        expect(calculateSecondEntityScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(2))
        expect(calculateSecondEntityScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(2))
        expect(calculateSecondEntityScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(4))
        expect(calculateSecondEntityScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(4))
        expect(calculateSecondEntityScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(6))
    })
})
