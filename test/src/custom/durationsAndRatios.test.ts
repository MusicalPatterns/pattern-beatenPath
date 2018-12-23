import { apply, from, Index, Ratio, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import {
    buildDurationsAndRatios,
    Core,
    Durations,
    DurationsAndRatios,
    to as beatenPathTo,
} from '../../../src/indexForTest'

const ratioToScalar: (ratio: Ratio) => Scalar = (ratio: Ratio): Scalar =>
    to.Scalar(from.FractionalPart(ratio[ 0 ]) / from.FractionalPart(ratio[ 1 ]))

describe('durations and ratios', () => {
    let durations: Durations
    let ratios: Ratio[]

    describe('durations', () => {
        for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = apply.Offset(core, to.Offset(1))) {
            describe(`when core is ${core}`, () => {
                beforeEach(() => {
                    const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
                    durations = durationsAndRatios.durations
                    ratios = durationsAndRatios.ratios
                })

                it('first duration is 1', () => {
                    expect(testIsCloseTo(durations[ 0 ], to.Scalar(1)))
                        .toBeTruthy()
                })

                it('each successive duration is equal to the previous duration multiplied by the next ratio', () => {
                    for (let i: Index = to.Index(1); i < to.Index(durations.length - 1); i = apply.Offset(i, to.Offset(1))) {
                        expect(testIsCloseTo(
                            apply.Index(durations, i),
                            apply.Scalar(apply.Index(durations, apply.Offset(i, to.Offset(-1))), ratioToScalar(ratios[ from.Index(i) - 1 ])),
                        ))
                    }
                })
            })
        }
    })

    describe('ratios', () => {
        it('when core is 2', () => {
            const core: Core = beatenPathTo.Core(2)
            const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
            durations = durationsAndRatios.durations
            ratios = durationsAndRatios.ratios

            const down: Ratio = to.Ratio([ 2, 1 ])
            const up: Ratio = to.Ratio([ 2, 3 ])

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

            expect(ratios)
                .toEqual(expectedRatios)
        })

        it('when core is 3', () => {
            const core: Core = beatenPathTo.Core(3)
            const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
            durations = durationsAndRatios.durations
            ratios = durationsAndRatios.ratios

            const down: Ratio = to.Ratio([ 3, 2 ])
            const up: Ratio = to.Ratio([ 3, 4 ])

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

            expect(ratios)
                .toEqual(expectedRatios)
        })

        it('when core is 4', () => {
            const core: Core = beatenPathTo.Core(4)
            const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
            durations = durationsAndRatios.durations
            ratios = durationsAndRatios.ratios

            const down: Ratio = to.Ratio([ 4, 3 ])
            const up: Ratio = to.Ratio([ 4, 5 ])

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

            expect(ratios)
                .toEqual(expectedRatios)
        })

        it('when core is 5', () => {
            const core: Core = beatenPathTo.Core(5)
            const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
            durations = durationsAndRatios.durations
            ratios = durationsAndRatios.ratios

            const down: Ratio = to.Ratio([ 5, 4 ])
            const up: Ratio = to.Ratio([ 5, 6 ])

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

            expect(ratios)
                .toEqual(expectedRatios)
        })
    })
})
