import { calculateNoteSpecsTotalCompiledDuration, NotePropertySpec, NoteSpec, Scale } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { apply, Count, from, Index, Maybe, Ratio, Scalar, testIsCloseTo, Time, to } from '@musical-patterns/utilities'
import {
    buildDurationsAndRatios,
    buildScales,
    buildSegments,
    Core,
    Durations,
    DurationsAndRatios,
    specData,
    to as beatenPathTo,
} from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]
    let durations: Durations
    let ratios: Ratio[]
    let scales: Scale[]

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = apply.Offset(core, to.Offset(1))) {
        const suite: (repetitions: Count) => void =
            (repetitions: Count): void => {
                beforeEach(() => {
                    const durationsAndRatios: DurationsAndRatios = buildDurationsAndRatios(core)
                    durations = durationsAndRatios.durations
                    ratios = durationsAndRatios.ratios
                    segments = buildSegments({ durations, ratios, repetitions })
                    scales = buildScales(specData.initial)
                })

                const calculateSegmentDuration: (segmentIndex: Index, entityIndex: Index) => Scalar =
                    (segmentIndex: Index, entityIndex: Index): Scalar => {
                        const segment: Segment = apply.Index(segments, segmentIndex)
                        const part: NoteSpec[] = apply.Index(segment, entityIndex)
                        const exampleNoteSpec: NoteSpec = part[ 0 ]

                        const durationSpec: NotePropertySpec = exampleNoteSpec.durationSpec || {}

                        return durationSpec.scalar || to.Scalar(0)
                    }

                it('each segment has two sets of notes, one for each entity', () => {
                    segments.forEach((segment: Segment): void => {
                        expect(segment.length)
                            .toBe(2)
                    })
                })

                it('each set of notes in each segment has notes which all have the same duration', () => {
                    segments.forEach((segment: Segment): void => {
                        segment.forEach((part: NoteSpec[]): void => {
                            let noteDuration: Scalar = to.Scalar(0)
                            part.forEach((noteSpec: NoteSpec): void => {
                                const durationSpec: Maybe<NotePropertySpec> = noteSpec.durationSpec
                                const durationSpecScalar: Maybe<Scalar> = durationSpec && durationSpec.scalar

                                if (durationSpecScalar) {
                                    if (from.Scalar(noteDuration) === 0) {
                                        noteDuration = durationSpecScalar
                                    }
                                    else {
                                        expect(durationSpecScalar)
                                            .toBe(noteDuration)
                                    }
                                }
                            })
                        })
                    })
                })

                it('each segment\'s two sets of notes have the same total duration', () => {
                    segments.forEach((segment: Segment): void => {
                        let segmentDuration: Time = to.Time(0)
                        segment.forEach((part: NoteSpec[]): void => {
                            if (from.Time(segmentDuration) === 0) {
                                segmentDuration = calculateNoteSpecsTotalCompiledDuration(part, scales)
                            }
                            else {
                                expect(
                                    testIsCloseTo(
                                        from.Time(calculateNoteSpecsTotalCompiledDuration(part, scales)),
                                        from.Time(segmentDuration),
                                    ),
                                )
                                    .toBeTruthy()
                            }
                        })
                    })
                })

                it('each segment has a different total duration than any other segment', () => {
                    const seenTotalDurations: Time[] = []
                    segments.forEach((segment: Segment): void => {
                        const exemplaryNotesForSegment: NoteSpec[] = segment[ 0 ]
                        const totalDuration: Time = calculateNoteSpecsTotalCompiledDuration(exemplaryNotesForSegment, scales)

                        seenTotalDurations.forEach((seenDuration: Time): void => {
                            expect(
                                testIsCloseTo(
                                    from.Time(seenDuration),
                                    from.Time(totalDuration),
                                    true,
                                ))
                                .toBeTruthy()
                        })

                        seenTotalDurations.push(totalDuration)
                    })
                })

                it('segments\'s note durations follow an alternating pattern of incrementing along the durations', () => {
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(0), to.Index(0)), durations[ 0 ]))
                        .toBeTruthy()
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(0), to.Index(1)), durations[ 1 ]))
                        .toBeTruthy()

                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(1), to.Index(0)), durations[ 2 ]))
                        .toBeTruthy()
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(1), to.Index(1)), durations[ 1 ]))
                        .toBeTruthy()

                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(2), to.Index(0)), durations[ 2 ]))
                        .toBeTruthy()
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(2), to.Index(1)), durations[ 3 ]))
                        .toBeTruthy()

                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(3), to.Index(0)), durations[ 4 ]))
                        .toBeTruthy()
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(3), to.Index(1)), durations[ 3 ]))
                        .toBeTruthy()

                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(4), to.Index(0)), durations[ 4 ]))
                        .toBeTruthy()
                    expect(testIsCloseTo(calculateSegmentDuration(to.Index(4), to.Index(1)), durations[ 5 ]))
                        .toBeTruthy()

                    // Etcetera...
                })

                it('for each segment, both of its sets of notes have a count of notes equal to the corresponding fractional part of that segment\'s ratio times the repetition', () => {
                    expect(segments[ 0 ][ 0 ].length)
                        .toBe(from.FractionalPart(ratios[ 0 ][ 0 ]) * from.Count(repetitions))
                    expect(segments[ 0 ][ 1 ].length)
                        .toBe(from.FractionalPart(ratios[ 0 ][ 1 ]) * from.Count(repetitions))

                    expect(segments[ 1 ][ 0 ].length)
                        .toBe(from.FractionalPart(ratios[ 1 ][ 1 ]) * from.Count(repetitions))
                    expect(segments[ 1 ][ 1 ].length)
                        .toBe(from.FractionalPart(ratios[ 1 ][ 0 ]) * from.Count(repetitions))

                    expect(segments[ 2 ][ 0 ].length)
                        .toBe(from.FractionalPart(ratios[ 2 ][ 0 ]) * from.Count(repetitions))
                    expect(segments[ 2 ][ 1 ].length)
                        .toBe(from.FractionalPart(ratios[ 2 ][ 1 ]) * from.Count(repetitions))

                    expect(segments[ 3 ][ 0 ].length)
                        .toBe(from.FractionalPart(ratios[ 3 ][ 1 ]) * from.Count(repetitions))
                    expect(segments[ 3 ][ 1 ].length)
                        .toBe(from.FractionalPart(ratios[ 3 ][ 0 ]) * from.Count(repetitions))

                    expect(segments[ 4 ][ 0 ].length)
                        .toBe(from.FractionalPart(ratios[ 4 ][ 0 ]) * from.Count(repetitions))
                    expect(segments[ 4 ][ 1 ].length)
                        .toBe(from.FractionalPart(ratios[ 4 ][ 1 ]) * from.Count(repetitions))

                    // Etcetera...
                })
            }

        describe(`when core is ${core}`, () => {
            describe('without intra-segment repetition', () => {
                const repetitions: Count = to.Count(1)
                suite(repetitions)
            })

            describe('with intra-segment repetition', () => {
                const repetitions: Count = to.Count(2)
                suite(repetitions)
            })
        })
    }
})
