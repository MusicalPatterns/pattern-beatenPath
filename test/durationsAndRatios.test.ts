import * as from from '../../../src/utilities/from'
import { Index, Scalar } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import testIsCloseTo from '../../../test/support/testIsCloseTo'
import { buildBeatenPathDurationsAndRatios } from '../src/durationsAndRatios'
import { Core, Durations, DurationsAndRatios, Ratio, Ratios } from '../src/types'
import * as beatenPathFrom from '../src/utilities/from'
import * as beatenPathTo from '../src/utilities/to'

const ratioToScalar: (ratio: Ratio) => Scalar = (ratio: Ratio): Scalar =>
    to.Scalar(beatenPathFrom.FractionalPart(ratio[0]) / beatenPathFrom.FractionalPart(ratio[1]))

describe('beaten path durations and ratios', () => {
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratios

    describe('durations', () => {
        for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = offset(core, to.Offset(1))) {
            describe(`when core is ${core}`, () => {
                beforeEach(() => {
                    const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
                    beatenPathDurations = durationsAndRatios.beatenPathDurations
                    beatenPathRatios = durationsAndRatios.beatenPathRatios
                })

                it('first duration is 1', () => {
                    expect(testIsCloseTo(beatenPathDurations[0], to.Time(1))).toBeTruthy()
                })

                it('each successive duration is equal to the previous duration multiplied by the next ratio', () => {
                    for (let i: Index = to.Index(1); i < to.Index(beatenPathDurations.length - 1); i = offset(i, to.Offset(1))) {
                        expect(testIsCloseTo(
                            beatenPathDurations[from.Index(i)],
                            scale(beatenPathDurations[from.Index(i) - 1], ratioToScalar(beatenPathRatios[from.Index(i) - 1])),
                        ))
                    }
                })
            })
        }
    })

    describe('ratios', () => {
        it('when core is 2', () => {
            const core: Core = beatenPathTo.Core(2)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 2, 1 ])
            const up: Ratio = beatenPathTo.Ratio([ 2, 3 ])

            const expectedRatios: Ratios = [
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
            ]

            expect(beatenPathRatios).toEqual(expectedRatios)
        })

        it('when core is 3', () => {
            const core: Core = beatenPathTo.Core(3)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 3, 2 ])
            const up: Ratio = beatenPathTo.Ratio([ 3, 4 ])

            const expectedRatios: Ratios = [
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
            ]

            expect(beatenPathRatios).toEqual(expectedRatios)
        })

        it('when core is 4', () => {
            const core: Core = beatenPathTo.Core(4)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 4, 3 ])
            const up: Ratio = beatenPathTo.Ratio([ 4, 5 ])

            const expectedRatios: Ratios = [
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
            ]

            expect(beatenPathRatios).toEqual(expectedRatios)
        })

        it('when core is 5', () => {
            const core: Core = beatenPathTo.Core(5)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 5, 4 ])
            const up: Ratio = beatenPathTo.Ratio([ 5, 6 ])

            const expectedRatios: Ratios = [
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
                down,
                up,
            ]

            expect(beatenPathRatios).toEqual(expectedRatios)
        })
    })
})
