// tslint:disable no-duplicate-string

import {
    as,
    Cycle,
    finalElement,
    Fraction,
    INCREMENT,
    indexOfFinalElement,
    insteadOf,
    length,
    Ordinal,
    Power,
    PREVIOUS,
    product,
    quotient,
    resolve,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { as as beatenPathAs, computeCoreCycles, Core, CoreCycles } from '../../../../src/indexForTest'

describe('core cycles', () => {
    let coreIntervals: Cycle<Fraction>
    let coreDurations: Cycle<Scalar>

    describe('core intervals', () => {
        it('when core is 2', () => {
            const core: Core = beatenPathAs.Core(2)
            const coreCycles: CoreCycles = computeCoreCycles(core)
            coreIntervals = coreCycles.coreIntervals

            const superp: Fraction = as.Fraction([ as.Numerator(2), as.Denominator(1) ])
            const subp: Fraction = as.Fraction([ as.Numerator(2), as.Denominator(3) ])

            const expectedIntervals: Cycle<Fraction> = as.Cycle([
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
            ])

            expect(coreIntervals)
                .toEqual(expectedIntervals)
        })

        it('when core is 3', () => {
            const core: Core = beatenPathAs.Core(3)
            const coreCycles: CoreCycles = computeCoreCycles(core)
            coreIntervals = coreCycles.coreIntervals

            const superp: Fraction = as.Fraction([ as.Numerator(3), as.Denominator(2) ])
            const subp: Fraction = as.Fraction([ as.Numerator(3), as.Denominator(4) ])

            const expectedIntervals: Cycle<Fraction> = as.Cycle([
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
            ])

            expect(coreIntervals)
                .toEqual(expectedIntervals)
        })

        it('when core is 4', () => {
            const core: Core = beatenPathAs.Core(4)
            const coreCycles: CoreCycles = computeCoreCycles(core)
            coreIntervals = coreCycles.coreIntervals

            const superp: Fraction = as.Fraction([ as.Numerator(4), as.Denominator(3) ])
            const subp: Fraction = as.Fraction([ as.Numerator(4), as.Denominator(5) ])

            const expectedIntervals: Cycle<Fraction> = as.Cycle([
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
            ])

            expect(coreIntervals)
                .toEqual(expectedIntervals)
        })

        it('when core is 5', () => {
            const core: Core = beatenPathAs.Core(5)
            const coreCycles: CoreCycles = computeCoreCycles(core)
            coreIntervals = coreCycles.coreIntervals

            const superp: Fraction = as.Fraction([ as.Numerator(5), as.Denominator(4) ])
            const subp: Fraction = as.Fraction([ as.Numerator(5), as.Denominator(6) ])

            const expectedIntervals: Cycle<Fraction> = as.Cycle([
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
                superp,
                subp,
            ])

            expect(coreIntervals)
                .toEqual(expectedIntervals)
        })
    })

    describe('core durations', () => {
        for (let core: Core = beatenPathAs.Core(2); core <= beatenPathAs.Core(7); core = use.Cardinal(core, INCREMENT)) {
            describe(`when core is ${core}`, () => {
                beforeEach(() => {
                    const coreCycles: CoreCycles = computeCoreCycles(core)
                    coreDurations = coreCycles.coreDurations
                    coreIntervals = coreCycles.coreIntervals
                })

                it('first duration is 1', () => {
                    expect(coreDurations[ 0 ])
                        .toBeCloseToTyped(as.Scalar(1))
                })

                it('each successive duration is equal to the previous duration multiplied by the previous interval', () => {
                    for (
                        let index: Ordinal<Scalar[]> = as.Ordinal<Scalar[]>(1);
                        index < indexOfFinalElement(coreDurations);
                        index = use.Cardinal(index, INCREMENT)
                    ) {
                        const previousDuration: Scalar = use.Ordinal(
                            coreDurations,
                            use.Cardinal(index, PREVIOUS),
                        )
                        const previousIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(use.Ordinal(
                            coreIntervals,
                            use.Cardinal(insteadOf<Ordinal, Fraction[]>(index), PREVIOUS),
                        )))
                        expect(use.Ordinal(coreDurations, index))
                            .toBeCloseToTyped(use.Scalar(
                                previousDuration,
                                previousIntervalAsScalar,
                            ))
                    }
                })
            })
        }

        describe('in hard-coded decimal terms so I have a clearer record of what exactly is going on here', () => {
            it('when core is 2', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(2))
                coreDurations = coreCycles.coreDurations

                expect(coreDurations)
                    .toEqual(as.Cycle([
                        1,
                        0.6666666666666666,
                        1.3333333333333333,
                        0.8888888888888888,
                        0.5925925925925926,
                        1.1851851851851851,
                        0.7901234567901234,
                        1.5802469135802468,
                        1.0534979423868311,
                        0.7023319615912207,
                        1.4046639231824414,
                        0.9364426154549609,
                        0.6242950769699739,
                        1.2485901539399478,
                        0.8323934359599652,
                        1.6647868719199304,
                        1.1098579146132868,
                        0.7399052764088578,
                        1.4798105528177157,
                        0.9865403685451437,
                        0.6576935790300957,
                        1.3153871580601915,
                        0.8769247720401276,
                        0.5846165146934184,
                        1.1692330293868367,
                        0.7794886862578911,
                        1.5589773725157823,
                        1.0393182483438548,
                        0.6928788322292365,
                        1.385757664458473,
                        0.9238384429723153,
                        0.6158922953148769,
                        1.2317845906297538,
                        0.8211897270865025,
                        1.642379454173005,
                        1.0949196361153366,
                        0.729946424076891,
                        1.459892848153782,
                        0.973261898769188,
                        0.6488412658461253,
                        1.2976825316922507,
                        0.8651216877948338,
                        1.7302433755896676,
                        1.153495583726445,
                        0.7689970558176299,
                        1.5379941116352598,
                        1.0253294077568398,
                        0.6835529385045598,
                        1.3671058770091196,
                        0.9114039180060797,
                        0.6076026120040531,
                        1.2152052240081062,
                        0.8101368160054041,
                        1.6202736320108082,
                        1.0801824213405387,
                        0.7201216142270257,
                        1.4402432284540514,
                        0.9601621523027009,
                        0.6401081015351339,
                        1.2802162030702677,
                        0.8534774687135118,
                        1.7069549374270236,
                        1.1379699582846823,
                        0.7586466388564548,
                        1.5172932777129096,
                        1.0115288518086063,
                        0.6743525678724042,
                        1.3487051357448083,
                        0.8991367571632055,
                        0.5994245047754703,
                        1.1988490095509405,
                        0.7992326730339603,
                        1.5984653460679206,
                        1.0656435640452804,
                        0.7104290426968536,
                        1.4208580853937072,
                        0.9472387235958047,
                        0.6314924823972031,
                        1.2629849647944063,
                        0.8419899765296042,
                        1.6839799530592083,
                        1.1226533020394722,
                        0.7484355346929814,
                        1.4968710693859628,
                    ].map(as.Scalar)))
            })

            it('when core is 3', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(3))
                coreDurations = coreCycles.coreDurations

                expect(coreDurations)
                    .toEqual(as.Cycle([
                        1,
                        0.75,
                        1.125,
                        0.84375,
                        1.265625,
                        0.94921875,
                        0.7119140625,
                        1.06787109375,
                        0.8009033203125,
                        1.20135498046875,
                        0.9010162353515625,
                        1.3515243530273438,
                        1.0136432647705078,
                        0.7602324485778809,
                        1.1403486728668213,
                        0.855261504650116,
                        1.282892256975174,
                        0.9621691927313805,
                        0.7216268945485353,
                        1.082440341822803,
                        0.8118302563671023,
                        1.2177453845506534,
                        0.91330903841299,
                        1.369963557619485,
                        1.0274726682146138,
                        0.7706045011609604,
                        1.1559067517414405,
                        0.8669300638060804,
                        1.3003950957091206,
                        0.9752963217818404,
                        0.7314722413363803,
                        1.0972083620045705,
                        0.8229062715034279,
                        1.2343594072551418,
                        0.9257695554413563,
                        1.3886543331620345,
                        1.0414907498715258,
                        0.7811180624036443,
                        1.1716770936054666,
                        0.8787578202041,
                        1.31813673030615,
                        0.9886025477296125,
                        0.7414519107972094,
                        1.1121778661958142,
                        0.8341333996468606,
                        1.251200099470291,
                        0.9384000746027182,
                        1.4076001119040773,
                        1.055700083928058,
                        0.7917750629460434,
                        1.187662594419065,
                        0.8907469458142988,
                        1.3361204187214482,
                    ].map(as.Scalar)))
            })

            it('when core is 4', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(4))
                coreDurations = coreCycles.coreDurations

                expect(coreDurations)
                    .toEqual(as.Cycle([
                        1,
                        0.8,
                        1.0666666666666667,
                        0.8533333333333334,
                        1.1377777777777778,
                        0.9102222222222223,
                        1.2136296296296296,
                        0.9709037037037037,
                        0.7767229629629631,
                        1.0356306172839507,
                        0.8285044938271606,
                        1.104672658436214,
                        0.8837381267489713,
                        1.1783175023319616,
                        0.9426540018655694,
                        1.2568720024874258,
                    ].map(as.Scalar)))
            })

            it('when core is 5', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(5))
                coreDurations = coreCycles.coreDurations

                expect(coreDurations)
                    .toEqual(as.Cycle([
                        1,
                        0.8333333333333333,
                        1.0416666666666665,
                        0.8680555555555554,
                        1.0850694444444442,
                        0.9042245370370368,
                        1.1302806712962958,
                        0.9419005594135798,
                        1.1773756992669746,
                        0.9811464160558121,
                        0.8176220133798433,
                        1.022027516724804,
                        0.85168959727067,
                        1.0646119965883374,
                        0.8871766638236144,
                        1.108970829779518,
                        0.9241423581495982,
                        1.1551779476869979,
                        0.9626482897391648,
                        1.203310362173956,
                    ].map(as.Scalar)))
            })
        })

        describe(
            `hard-coded, but expressed as fractions which is also helpful in a different way, \
            so you can see how the numerator is powers of the core while the denominator \
            contains only factors of +/- 1 of the core, so they can never be reduced in terms`,
            () => {
                it('when core is 2', () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(2))
                    coreDurations = coreCycles.coreDurations

                    expect(coreDurations)
                        .toBeCloseSoFar(
                            [
                                1,
                                2 / 3,
                                4 / 3,
                                8 / 9,
                                16 / 27,
                                32 / 27,
                                64 / 81,
                            ].map(as.Scalar),
                        )
                })

                it('when core is 3', () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(3))
                    coreDurations = coreCycles.coreDurations

                    expect(coreDurations)
                        .toBeCloseSoFar(
                            [
                                1,
                                3 / 4,
                                9 / 8,
                                27 / 32,
                                81 / 64,
                                243 / 256,
                            ].map(as.Scalar),
                        )
                })

                it('when core is 4', () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(4))
                    coreDurations = coreCycles.coreDurations

                    expect(coreDurations)
                        .toBeCloseSoFar(
                            [
                                1,
                                4 / 5,
                                16 / 15,
                                64 / 75,
                                256 / 225,
                            ].map(as.Scalar),
                        )
                })

                it('when core is 5', () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(5))
                    coreDurations = coreCycles.coreDurations

                    expect(coreDurations)
                        .toBeCloseSoFar(
                            [
                                1,
                                5 / 6,
                                25 / 24,
                                125 / 144,
                                625 / 576,
                            ].map(as.Scalar),
                        )
                })
            },
        )

        describe(
            `hard-coded what the next durations would have been if we did not choose to conflate them with 1 \
            so we could wrap around creating a cycle at these points`,
            () => {
                it(`for core 2, in monzo form it's | 84 -53 >, AKA the reciprocal of Mercator's comma`, () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(2))
                    coreDurations = coreCycles.coreDurations
                    coreIntervals = coreCycles.coreIntervals

                    const finalDuration: Scalar = finalElement(coreDurations)
                    const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                    const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(0.9979140462573085)
                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(19342813113834066795298816 / 19383245667680019896796723)
                })

                it(`for core 3, in monzo form it's | -84 53 >, AKA Mercator's comma`, () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(3))
                    coreDurations = coreCycles.coreDurations
                    coreIntervals = coreCycles.coreIntervals

                    const finalDuration: Scalar = finalElement(coreDurations)
                    const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                    const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(1.0020903140410862)
                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(19383245667680019896796723 / 19342813113834066795298816)
                })

                it(`for core 4, in monzo form it's | 32 -7 -9>, AKA the escapade comma`, () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(4))
                    coreDurations = coreCycles.coreDurations
                    coreIntervals = coreCycles.coreIntervals

                    const finalDuration: Scalar = finalElement(coreDurations)
                    const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                    const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(1.0054976019899406)
                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(4294967296 / 4271484375)
                })

                it(`for core 5, in monzo form it's | -29 -11 20 >, AKA the gammic comma`, () => {
                    const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(5))
                    coreDurations = coreCycles.coreDurations
                    coreIntervals = coreCycles.coreIntervals

                    const finalDuration: Scalar = finalElement(coreDurations)
                    const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                    const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(1.0027586351449633)
                    expect(nextDurationWouldHaveBeen)
                        .toBeCloseTo(95367431640625 / 95105071448064)
                })
            },
        )

        describe('in terms of subps and superps', () => {
            it('for core 2', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(2))
                coreDurations = coreCycles.coreDurations
                coreIntervals = coreCycles.coreIntervals

                const finalDuration: Scalar = finalElement(coreDurations)
                const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                const totalUpIntervals: Power = as.Power(53)
                const totalDownIntervals: Power = as.Power(31)
                const totalIntervals: Power = as.Power(as.number(length(coreIntervals)))
                expect(nextDurationWouldHaveBeen)
                    .toBeCloseToTyped(as.Scalar(quotient(
                        use.Power(2, totalIntervals),
                        product(
                            use.Power(3, totalUpIntervals),
                            use.Power(1, totalDownIntervals),
                        ),
                    )))
                expect(as.number(totalUpIntervals) + as.number(totalDownIntervals))
                    .toBe(as.number(totalIntervals))
            })

            it('for core 3', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(3))
                coreDurations = coreCycles.coreDurations
                coreIntervals = coreCycles.coreIntervals

                const finalDuration: Scalar = finalElement(coreDurations)
                const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                const totalUpIntervals: Power = as.Power(31)
                const totalDownIntervals: Power = as.Power(22)
                const totalIntervals: Power = as.Power(as.number(length(coreIntervals)))
                expect(nextDurationWouldHaveBeen)
                    .toBeCloseToTyped(as.Scalar(quotient(
                        use.Power(3, totalIntervals),
                        product(
                            use.Power(4, totalUpIntervals),
                            use.Power(2, totalDownIntervals),
                        ),
                    )))
                expect(as.number(totalUpIntervals) + as.number(totalDownIntervals))
                    .toBe(as.number(totalIntervals))
            })

            it('for core 4', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(4))
                coreDurations = coreCycles.coreDurations
                coreIntervals = coreCycles.coreIntervals

                const finalDuration: Scalar = finalElement(coreDurations)
                const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                const totalUpIntervals: Power = as.Power(9)
                const totalDownIntervals: Power = as.Power(7)
                const totalIntervals: Power = as.Power(as.number(length(coreIntervals)))
                expect(nextDurationWouldHaveBeen)
                    .toBeCloseToTyped(as.Scalar(quotient(
                        use.Power(4, totalIntervals),
                        product(
                            use.Power(5, totalUpIntervals),
                            use.Power(3, totalDownIntervals),
                        ),
                    )))
                expect(as.number(totalUpIntervals) + as.number(totalDownIntervals))
                    .toBe(as.number(totalIntervals))
            })

            it('for core 5', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(5))
                coreDurations = coreCycles.coreDurations
                coreIntervals = coreCycles.coreIntervals

                const finalDuration: Scalar = finalElement(coreDurations)
                const finalIntervalAsScalar: Scalar<Scalar> = as.Scalar<Scalar>(resolve(finalElement(coreIntervals)))

                const nextDurationWouldHaveBeen: Scalar = use.Scalar(finalDuration, finalIntervalAsScalar)

                const totalUpIntervals: Power = as.Power(11)
                const totalDownIntervals: Power = as.Power(9)
                const totalIntervals: Power = as.Power(as.number(length(coreIntervals)))
                expect(nextDurationWouldHaveBeen)
                    .toBeCloseToTyped(as.Scalar(quotient(
                        use.Power(5, totalIntervals),
                        product(
                            use.Power(6, totalUpIntervals),
                            use.Power(4, totalDownIntervals),
                        ),
                    )))
                expect(as.number(totalUpIntervals) + as.number(totalDownIntervals))
                    .toBe(as.number(totalIntervals))
            })
        })
    })

    describe(
        `is the case that no matter what the core, there is the same count of intervals as there are durations \
    (because they are cycles, so there is the same number of intervals between things as there are things (durations)`,
        () => {
            it('for core 2, they are both 84', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(2))
                coreIntervals = coreCycles.coreIntervals
                coreDurations = coreCycles.coreDurations
                expect(length(coreIntervals))
                    .toBe(as.Cardinal<Cycle<Fraction>>(84))
                expect(length(coreDurations))
                    .toBe(as.Cardinal<Cycle<Scalar>>(84))
            })

            it('for core 3, they are both 53', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(3))
                coreIntervals = coreCycles.coreIntervals
                coreDurations = coreCycles.coreDurations
                expect(length(coreIntervals))
                    .toBe(as.Cardinal<Cycle<Fraction>>(53))
                expect(length(coreDurations))
                    .toBe(as.Cardinal<Cycle<Scalar>>(53))
            })

            it('for core 4, they are both 16', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(4))
                coreIntervals = coreCycles.coreIntervals
                coreDurations = coreCycles.coreDurations
                expect(length(coreIntervals))
                    .toBe(as.Cardinal<Cycle<Fraction>>(16))
                expect(length(coreDurations))
                    .toBe(as.Cardinal<Cycle<Scalar>>(16))
            })

            it('for core 5, they are both 20', () => {
                const coreCycles: CoreCycles = computeCoreCycles(beatenPathAs.Core(5))
                coreIntervals = coreCycles.coreIntervals
                coreDurations = coreCycles.coreDurations
                expect(length(coreIntervals))
                    .toBe(as.Cardinal<Cycle<Fraction>>(20))
                expect(length(coreDurations))
                    .toBe(as.Cardinal<Cycle<Scalar>>(20))
            })
        },
    )
})
