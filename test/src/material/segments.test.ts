import { calculateNoteSpecsTotalCompiledDuration, NotePropertySpec, NoteSpec, Scale } from '@musical-patterns/compiler'
import { buildStandardScales, Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    Fraction,
    from,
    Maybe,
    Ms,
    NEXT,
    Ordinal,
    Scalar,
    testIsCloseTo,
    to,
} from '@musical-patterns/utilities'
import {
    BeatenPathStyle,
    buildFractionsAndScalars,
    buildSegments,
    Core,
    FractionsAndScalars,
    specData,
    to as beatenPathTo,
} from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]
    let scalars: Scalar[]
    let fractions: Fraction[]
    let scales: Scale[]

    const suite: (core: Core, repetitions: Cardinal) => void =
        (core: Core, repetitions: Cardinal): void => {
            beforeEach(() => {
                const fractionsAndScalars: FractionsAndScalars = buildFractionsAndScalars(core)
                scalars = fractionsAndScalars.scalars
                fractions = fractionsAndScalars.fractions
            })

            describe('polyrhythmic style', () => {
                beforeEach(() => {
                    segments = buildSegments({ scalars, fractions, repetitions, style: specData.initial.style })
                    scales = buildStandardScales(specData.initial)
                })

                sharedPartOfSuite()

                polyrhythmicPartOfSuite(repetitions)
            })

            describe('smooth style', () => {
                beforeEach(() => {
                    segments = buildSegments({ scalars, fractions, repetitions, style: BeatenPathStyle.SMOOTH })
                    scales = buildStandardScales({
                        ...specData.initial,
                        style: BeatenPathStyle.SMOOTH,
                    })
                })

                sharedPartOfSuite()

                smoothPartOfSuite(repetitions)
            })
        }

    const sharedPartOfSuite: VoidFunction =
        (): void => {
            it('each segment has two parts, one for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(segment.length)
                        .toBe(2)
                })
            })

            it('each part in each segment has notes which all have the same duration', () => {
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

            it('each segment\'s two parts have the same total duration', () => {
                segments.forEach((segment: Segment): void => {
                    let segmentDuration: Ms = to.Ms(0)
                    segment.forEach((part: NoteSpec[]): void => {
                        if (from.Ms(segmentDuration) === 0) {
                            segmentDuration = calculateNoteSpecsTotalCompiledDuration(part, scales)
                        }
                        else {
                            expect(
                                testIsCloseTo(
                                    from.Ms(calculateNoteSpecsTotalCompiledDuration(part, scales)),
                                    from.Ms(segmentDuration),
                                ),
                            )
                                .toBeTruthy()
                        }
                    })
                })
            })

            it('each segment has a different total duration than any other segment', () => {
                const seenTotalDurations: Ms[] = []
                segments.forEach((segment: Segment): void => {
                    const exemplaryNotesForSegment: NoteSpec[] = segment[ 0 ]
                    const totalDuration: Ms = calculateNoteSpecsTotalCompiledDuration(exemplaryNotesForSegment, scales)

                    seenTotalDurations.forEach((seenDuration: Ms): void => {
                        expect(
                            testIsCloseTo(
                                from.Ms(seenDuration),
                                from.Ms(totalDuration),
                                true,
                            ))
                            .toBeTruthy()
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })
        }

    const smoothPartOfSuite: (repetitions: Cardinal) => void =
        (repetitions: Cardinal): void => {
            it('for each segment, its note\'s scalars are the sum of what they would have been in polyrhythmic mode as separate notes', () => {
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(0)),
                    apply.Scalar(scalars[ 0 ], to.Scalar(from.Numerator(fractions[ 0 ][ 0 ]))),
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(1)),
                    apply.Scalar(scalars[ 1 ], to.Scalar(from.Denominator(fractions[ 0 ][ 1 ]))),
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(0)),
                    apply.Scalar(scalars[ 2 ], to.Scalar(from.Denominator(fractions[ 1 ][ 1 ]))),
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(1)),
                    apply.Scalar(scalars[ 1 ], to.Scalar(from.Numerator(fractions[ 1 ][ 0 ]))),
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(0)),
                    apply.Scalar(scalars[ 2 ], to.Scalar(from.Numerator(fractions[ 2 ][ 0 ]))),
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(1)),
                    apply.Scalar(scalars[ 3 ], to.Scalar(from.Denominator(fractions[ 2 ][ 1 ]))),
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(0)),
                    apply.Scalar(scalars[ 4 ], to.Scalar(from.Denominator(fractions[ 3 ][ 1 ]))),
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(1)),
                    apply.Scalar(scalars[ 3 ], to.Scalar(from.Numerator(fractions[ 3 ][ 0 ]))),
                )

                // Etcetera...
            })

            it('for each segment, both of its parts have a count of notes equal to the repetition', () => {
                segments.forEach((segment: Segment): void => {
                    segment.forEach((part: NoteSpec[]): void => {
                        expect(to.Cardinal(part.length))
                            .toBe(repetitions)
                    })
                })
            })
        }

    const polyrhythmicPartOfSuite: (repetitions: Cardinal) => void =
        (repetitions: Cardinal): void => {
            it('segments\'s note scalars follow an alternating pattern of incrementing along the scalars', () => {
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(0)),
                    scalars[ 1 ],
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(1)),
                    scalars[ 0 ],
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(0)),
                    scalars[ 1 ],
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(1)),
                    scalars[ 2 ],
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(0)),
                    scalars[ 3 ],
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(1)),
                    scalars[ 2 ],
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(0)),
                    scalars[ 3 ],
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(1)),
                    scalars[ 4 ],
                )

                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(4), to.Ordinal(0)),
                    scalars[ 5 ],
                )
                testIsCloseTo(
                    getDurationOfSegmentNote(to.Ordinal(4), to.Ordinal(1)),
                    scalars[ 4 ],
                )

                // Etcetera...
            })

            it('for each segment, both of its parts have a count of notes equal to the corresponding fractional part of that segment\'s fraction times the repetition', () => {
                expect(segments[ 0 ][ 0 ].length)
                    .toBe(from.Denominator(apply.Scalar(fractions[ 0 ][ 1 ], to.Scalar(from.Cardinal(repetitions)))))
                expect(segments[ 0 ][ 1 ].length)
                    .toBe(from.Numerator(apply.Scalar(fractions[ 0 ][ 0 ], to.Scalar(from.Cardinal(repetitions)))))

                expect(segments[ 1 ][ 0 ].length)
                    .toBe(from.Numerator(apply.Scalar(fractions[ 1 ][ 0 ], to.Scalar(from.Cardinal(repetitions)))))
                expect(segments[ 1 ][ 1 ].length)
                    .toBe(from.Denominator(apply.Scalar(fractions[ 1 ][ 1 ], to.Scalar(from.Cardinal(repetitions)))))

                expect(segments[ 2 ][ 0 ].length)
                    .toBe(from.Denominator(apply.Scalar(fractions[ 2 ][ 1 ], to.Scalar(from.Cardinal(repetitions)))))
                expect(segments[ 2 ][ 1 ].length)
                    .toBe(from.Numerator(apply.Scalar(fractions[ 2 ][ 0 ], to.Scalar(from.Cardinal(repetitions)))))

                expect(segments[ 3 ][ 0 ].length)
                    .toBe(from.Numerator(apply.Scalar(fractions[ 3 ][ 0 ], to.Scalar(from.Cardinal(repetitions)))))
                expect(segments[ 3 ][ 1 ].length)
                    .toBe(from.Denominator(apply.Scalar(fractions[ 3 ][ 1 ], to.Scalar(from.Cardinal(repetitions)))))

                expect(segments[ 4 ][ 0 ].length)
                    .toBe(from.Denominator(apply.Scalar(fractions[ 4 ][ 1 ], to.Scalar(from.Cardinal(repetitions)))))
                expect(segments[ 4 ][ 1 ].length)
                    .toBe(from.Numerator(apply.Scalar(fractions[ 4 ][ 0 ], to.Scalar(from.Cardinal(repetitions)))))

                // Etcetera...
            })
        }

    const getDurationOfSegmentNote: (segmentIndex: Ordinal, partIndex: Ordinal) => Scalar =
        (segmentIndex: Ordinal, partIndex: Ordinal): Scalar => {
            const segment: Segment = apply.Ordinal(segments, segmentIndex)
            const part: NoteSpec[] = apply.Ordinal(segment, partIndex)
            const exampleNoteSpec: NoteSpec = part[ 0 ]

            const durationSpec: NotePropertySpec = exampleNoteSpec.durationSpec || {}

            return durationSpec.scalar || to.Scalar(0)
        }

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = apply.Translation(core, NEXT)) {
        describe(`when core is ${core}`, () => {
            describe('without intra-segment repetition', () => {
                const repetitions: Cardinal = to.Cardinal(1)
                suite(core, repetitions)
            })

            describe('with intra-segment repetition', () => {
                const repetitions: Cardinal = to.Cardinal(2)
                suite(core, repetitions)
            })
        })
    }
})
