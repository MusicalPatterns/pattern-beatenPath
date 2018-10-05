import testIsCloseTo from '../../../spec/support/testIsCloseTo'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { buildBeatenPathDurationsAndRatios } from '../src/durationsAndRatios'
import { Durations } from '../src/types'

describe('beaten path durations and ratios', () => {
    let beatenPathDurations: Durations
    beforeEach(() => {
        beatenPathDurations = buildBeatenPathDurationsAndRatios(5).beatenPathDurations
    })

    it('first duration is 1', () => {
        expect(testIsCloseTo(beatenPathDurations[0], to.Time(1))).toBeTruthy()
    })

    it('block 1 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[1], scale(beatenPathDurations[0], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 2 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[2], scale(beatenPathDurations[1], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 3 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[3], scale(beatenPathDurations[2], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 4 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[4], scale(beatenPathDurations[3], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 5 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[5], scale(beatenPathDurations[4], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 6 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[6], scale(beatenPathDurations[5], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 7 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[7], scale(beatenPathDurations[6], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 8 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[8], scale(beatenPathDurations[7], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 9 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[9], scale(beatenPathDurations[8], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 10 - ALSO 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[10], scale(beatenPathDurations[9], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 11 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[11], scale(beatenPathDurations[10], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 12 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[12], scale(beatenPathDurations[11], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 13 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[13], scale(beatenPathDurations[12], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 14 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[14], scale(beatenPathDurations[13], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 15 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[15], scale(beatenPathDurations[14], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 16 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[16], scale(beatenPathDurations[15], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 17 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[17], scale(beatenPathDurations[16], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 18 - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[18], scale(beatenPathDurations[17], to.Scalar(5 / 6)))).toBeTruthy()
    })
    it('block 19 - 5/4 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[19], scale(beatenPathDurations[18], to.Scalar(5 / 4)))).toBeTruthy()
    })

    it('block 0 (WRAPPING AROUND) - 5/6 of previous block', () => {
        expect(testIsCloseTo(beatenPathDurations[0], scale(beatenPathDurations[19], to.Scalar(5 / 6)))).toBeTruthy()
    })
})
