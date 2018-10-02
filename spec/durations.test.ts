import { beatenPathDurations } from '../src/durations'
import isCloseTo from '../../../spec/support/isCloseTo'

describe('beaten path durations', () => {
    it('first duration is 1', () => {
        expect(isCloseTo(beatenPathDurations[0], 1)).toBeTruthy()
    })

    it('block 1 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[1], beatenPathDurations[0] * 5 / 6)).toBeTruthy()
    })
    it('block 2 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[2], beatenPathDurations[1] * 5 / 4)).toBeTruthy()
    })

    it('block 3 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[3], beatenPathDurations[2] * 5 / 6)).toBeTruthy()
    })
    it('block 4 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[4], beatenPathDurations[3] * 5 / 4)).toBeTruthy()
    })

    it('block 5 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[5], beatenPathDurations[4] * 5 / 6)).toBeTruthy()
    })
    it('block 6 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[6], beatenPathDurations[5] * 5 / 4)).toBeTruthy()
    })

    it('block 7 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[7], beatenPathDurations[6] * 5 / 6)).toBeTruthy()
    })
    it('block 8 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[8], beatenPathDurations[7] * 5 / 4)).toBeTruthy()
    })

    it('block 9 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[9], beatenPathDurations[8] * 5 / 6)).toBeTruthy()
    })
    it('block 10 - ALSO 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[10], beatenPathDurations[9] * 5 / 6)).toBeTruthy()
    })
    it('block 11 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[11], beatenPathDurations[10] * 5 / 4)).toBeTruthy()
    })

    it('block 12 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[12], beatenPathDurations[11] * 5 / 6)).toBeTruthy()
    })
    it('block 13 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[13], beatenPathDurations[12] * 5 / 4)).toBeTruthy()
    })

    it('block 14 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[14], beatenPathDurations[13] * 5 / 6)).toBeTruthy()
    })
    it('block 15 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[15], beatenPathDurations[14] * 5 / 4)).toBeTruthy()
    })

    it('block 16 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[16], beatenPathDurations[15] * 5 / 6)).toBeTruthy()
    })
    it('block 17 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[17], beatenPathDurations[16] * 5 / 4)).toBeTruthy()
    })

    it('block 18 - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[18], beatenPathDurations[17] * 5 / 6)).toBeTruthy()
    })
    it('block 19 - 5/4 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[19], beatenPathDurations[18] * 5 / 4)).toBeTruthy()
    })

    it('block 0 (WRAPPING AROUND) - 5/6 of previous block', () => {
        expect(isCloseTo(beatenPathDurations[0], beatenPathDurations[19] * 5 / 6)).toBeTruthy()
    })
})
