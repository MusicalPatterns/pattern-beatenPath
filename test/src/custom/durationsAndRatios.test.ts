import {
    apply,
    from,
    indexOfLastElement,
    negative,
    NEXT,
    Ordinal,
    Ratio,
    Scalar,
    testIsCloseTo,
    to,
} from '@musical-patterns/utilities'
import { buildDurationsAndRatios, Core, DurationsAndRatios, to as beatenPathTo } from '../../../src/indexForTest'

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

        describe('it also tests against hard-coded durations so i have a clearer record of what exactly is going on here', () => {
            it('when core is 2', () => {
                const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(beatenPathTo.Core(2))
                durations = durationsAndRatios.durations

                expect(durations)
                    .toEqual([
                        1,
                        0.6666666666666666, // 2  / 3
                        1.3333333333333333, // 4  / 3
                        0.8888888888888888, // 8  / 9
                        0.5925925925925926, // 32 / 54
                        1.1851851851851851, // 64 / 54
                        0.7901234567901234, // 64 / 81
                        1.5802469135802468, // ...
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
                        0.9979140462573085, // Almost exactly 1: 2^84 / (3^53 * 1^31) = 19342813113834066795298816 / 19383245667680019896796723, in monzo form | 84 -53 >, AKA the reciprocal of Mercator's comma & note that 84 = 53 + 31
                    ].map(to.Scalar))
            })

            it('when core is 3', () => {
                const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(beatenPathTo.Core(3))
                durations = durationsAndRatios.durations

                expect(durations)
                    .toEqual([
                        1,
                        0.75,               // 3   / 4
                        1.125,              // 9   / 8
                        0.84375,            // 27  / 32
                        1.265625,           // 81  / 64
                        0.94921875,         // 243 / 256
                        0.7119140625,       // ...
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
                        1.0020903140410862, // Almost exactly 1: 3^53 / (4^31 * 2^22) = 19383245667680019896796723 / 19342813113834066795298816, in monzo form | -84 53 >, AKA Mercator's comma & note that 53 = 31 + 22
                    ].map(to.Scalar))
            })

            it('when core is 4', () => {
                const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(beatenPathTo.Core(4))
                durations = durationsAndRatios.durations

                expect(durations)
                    .toEqual([
                        1,
                        0.8,                // 4  / 5
                        1.0666666666666667, // 16 / 15
                        0.8533333333333334, // 64 / 75
                        1.1377777777777778, // 256 / 225
                        0.9102222222222223, // ...
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
                        1.0054976019899406, // Almost exactly 1: 4^16 / (5^9 * 3^7) = 4294967296 / 4271484375, in monzo form | 32 -7 -9>, AKA the escapade comma & note that 16 = 9 + 7
                    ].map(to.Scalar))
            })

            it('when core is 5', () => {
                const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(beatenPathTo.Core(5))
                durations = durationsAndRatios.durations

                expect(durations)
                    .toEqual([
                        1,
                        0.8333333333333333, // 5  / 6
                        1.0416666666666665, // 25 / 24
                        0.8680555555555554, // 125 / 144
                        1.0850694444444442, // 625 / 576
                        0.9042245370370368, // ...
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
                        1.0027586351449633, // Almost exactly 1: 5^20 / (6^11 * 4^9) = 95367431640625 / 95105071448064, in monzo form | -29 -11 20 >, AKA the gammic comma
                    ].map(to.Scalar))
            })
        })
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
