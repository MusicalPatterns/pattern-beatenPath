import { beatenPathDurations } from '../src/durations'

describe('beaten path durations', () => {
    it('first duration is 1', () => {
        expect(beatenPathDurations[0]).toBe(1)
    })

    it('block 1 - 5/6 of previous block', () => {
        expect(beatenPathDurations[1]).toBe(beatenPathDurations[0] * 5 / 6)
    })

    it('block 2 - 5/4 of previous block', () => {
        expect(beatenPathDurations[2]).toBe(beatenPathDurations[1] * 5 / 4)
    })

    it('block 3 - 5/6 of previous block', () => {
        expect(beatenPathDurations[3]).toBe(beatenPathDurations[2] * 5 / 6)
    })

    it('block 4 - 5/4 of previous block', () => {
        expect(beatenPathDurations[4]).toBe(beatenPathDurations[3] * 5 / 4)
    })

    it('block 5 - 5/6 of previous block', () => {
        expect(beatenPathDurations[5]).toBe(beatenPathDurations[4] * 5 / 6)
    })

    it('block 5 - 5/6 of previous block', () => {
        expect(beatenPathDurations[6]).toBe(beatenPathDurations[5] * 5 / 4)
    })

    // 5/4

    // 5/6
    // 5/4

    // 5/6
    // 5/6
    // 5/4

    // 5/6
    // 5/4

    // 5/6
    // 5/4

    // 5/6
    // 5/4

    // 5/6
    // 5/6
    // 5/4
})
