import { applyOffset, applyScale, from, Index, Scalar, to } from '../../../src/indexForTest'
import { testIsCloseTo } from '../../../test'
import {
    buildBeatenPathDurationsAndRatios,
    Core,
    Durations,
    DurationsAndRatios,
    from as beatenPathFrom,
    Ratio,
    to as beatenPathTo,
} from '../src/indexForTest'

const ratioToScalar: (ratio: Ratio) => Scalar = (ratio: Ratio): Scalar =>
    to.Scalar(beatenPathFrom.FractionalPart(ratio[ 0 ]) / beatenPathFrom.FractionalPart(ratio[ 1 ]))

describe('beaten path durations and ratios', () => {
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratio[]

    describe('durations', () => {
        for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = applyOffset(core, to.Offset(1))) {
            describe(`when core is ${core}`, () => {
                beforeEach(() => {
                    const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
                    beatenPathDurations = durationsAndRatios.beatenPathDurations
                    beatenPathRatios = durationsAndRatios.beatenPathRatios
                })

                it('first duration is 1', () => {
                    expect(testIsCloseTo(beatenPathDurations[ 0 ], to.Scalar(1)))
                        .toBeTruthy()
                })

                it('each successive duration is equal to the previous duration multiplied by the next ratio', () => {
                    for (let i: Index = to.Index(1); i < to.Index(beatenPathDurations.length - 1); i = applyOffset(i, to.Offset(1))) {
                        expect(testIsCloseTo(
                            beatenPathDurations[ from.Index(i) ],
                            applyScale(beatenPathDurations[ from.Index(i) - 1 ], ratioToScalar(beatenPathRatios[ from.Index(i) - 1 ])),
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

            const expectedRatios: Ratio[] = [
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

            expect(beatenPathRatios)
                .toEqual(expectedRatios)
        })

        it('when core is 3', () => {
            const core: Core = beatenPathTo.Core(3)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 3, 2 ])
            const up: Ratio = beatenPathTo.Ratio([ 3, 4 ])

            const expectedRatios: Ratio[] = [
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

            expect(beatenPathRatios)
                .toEqual(expectedRatios)
        })

        it('when core is 4', () => {
            const core: Core = beatenPathTo.Core(4)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 4, 3 ])
            const up: Ratio = beatenPathTo.Ratio([ 4, 5 ])

            const expectedRatios: Ratio[] = [
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

            expect(beatenPathRatios)
                .toEqual(expectedRatios)
        })

        it('when core is 5', () => {
            const core: Core = beatenPathTo.Core(5)
            const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
            beatenPathDurations = durationsAndRatios.beatenPathDurations
            beatenPathRatios = durationsAndRatios.beatenPathRatios

            const down: Ratio = beatenPathTo.Ratio([ 5, 4 ])
            const up: Ratio = beatenPathTo.Ratio([ 5, 6 ])

            const expectedRatios: Ratio[] = [
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

            expect(beatenPathRatios)
                .toEqual(expectedRatios)
        })
    })
})
