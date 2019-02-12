import {
    apply,
    from,
    indexOfLastElement,
    negative,
    NEXT,
    Ordinal,
    Ratio,
    reciprocal,
    Scalar,
    testIsCloseTo,
    to,
} from '@musical-patterns/utilities'
import {
    buildDurationsAndRatios,
    Core,
    DurationsAndRatios,
    to as beatenPathTo,
} from '../../../src/indexForTest'

describe('durations and ratios', () => {
    let durations: Scalar[]
    let ratios: Ratio[]

    describe('durations', () => {
        for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = apply.Translation(core, NEXT)) {
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
                    for (
                        let index: Ordinal = to.Ordinal(1);
                        index < indexOfLastElement(durations);
                        index = apply.Translation(index, NEXT)
                    ) {
                        expect(testIsCloseTo(
                            apply.Ordinal(durations, index),
                            apply.Scalar(
                                apply.Ordinal(
                                    durations,
                                    apply.Translation(index, to.Translation(negative(1))),
                                ),
                                to.Scalar(from.Ratio(ratios[ from.Ordinal(index) - 1 ])),
                            ),
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
