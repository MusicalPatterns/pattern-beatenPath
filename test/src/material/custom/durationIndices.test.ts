import { to } from '@musical-patterns/utilities'
import { calculateFirstPartScalarIndex, calculateSecondPartScalarIndex } from '../../../../src/indexForTest'

describe('scalar indices', () => {
    it('first entity', () => {
        expect(calculateFirstPartScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(1))
        expect(calculateFirstPartScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(1))
        expect(calculateFirstPartScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(3))
        expect(calculateFirstPartScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(3))
        expect(calculateFirstPartScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(5))
        expect(calculateFirstPartScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(5))
    })

    it('second entity', () => {
        expect(calculateSecondPartScalarIndex(to.Ordinal(0)))
            .toBe(to.Ordinal(0))
        expect(calculateSecondPartScalarIndex(to.Ordinal(1)))
            .toBe(to.Ordinal(2))
        expect(calculateSecondPartScalarIndex(to.Ordinal(2)))
            .toBe(to.Ordinal(2))
        expect(calculateSecondPartScalarIndex(to.Ordinal(3)))
            .toBe(to.Ordinal(4))
        expect(calculateSecondPartScalarIndex(to.Ordinal(4)))
            .toBe(to.Ordinal(4))
        expect(calculateSecondPartScalarIndex(to.Ordinal(5)))
            .toBe(to.Ordinal(6))
    })
})
