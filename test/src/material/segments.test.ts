import { computeNotesTotalCompiledDuration, Note, NoteFeature, Scale } from '@musical-patterns/compiler'
import { materializeStandardScales, Segment } from '@musical-patterns/pattern'
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
    computeFractionsAndScalars,
    computeSegments,
    Core,
    FractionsAndScalars,
    spec,
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
                const fractionsAndScalars: FractionsAndScalars = computeFractionsAndScalars(core)
                scalars = fractionsAndScalars.scalars
                fractions = fractionsAndScalars.fractions
            })

            describe('polyrhythmic style', () => {
                beforeEach(() => {
                    segments = computeSegments({ scalars, fractions, repetitions, style: spec.initial.style })
                    scales = materializeStandardScales(spec.initial)
                })

                sharedSuite()

                polyrhythmicSuite(repetitions)
            })

            describe('smooth style', () => {
                beforeEach(() => {
                    segments = computeSegments({ scalars, fractions, repetitions, style: BeatenPathStyle.SMOOTH })
                    scales = materializeStandardScales({
                        ...spec.initial,
                        style: BeatenPathStyle.SMOOTH,
                    })
                })

                sharedSuite()

                smoothSuite(repetitions)
            })
        }

    const sharedSuite: VoidFunction =
        (): void => {
            it('each segment has two sets of notes, one for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(segment.length)
                        .toBe(2)
                })
            })

            it('each set of notes in each segment has notes which all have the same duration', () => {
                segments.forEach((segment: Segment): void => {
                    segment.forEach((notes: Note[]): void => {
                        let noteDuration: Scalar = to.Scalar(0)
                        notes.forEach((note: Note): void => {
                            const duration: Maybe<NoteFeature> = note.duration
                            const durationSpecsScalar: Maybe<Scalar> = duration!.scalar

                            if (durationSpecsScalar) {
                                if (from.Scalar(noteDuration) === 0) {
                                    noteDuration = durationSpecsScalar
                                }
                                else {
                                    expect(durationSpecsScalar)
                                        .toBe(noteDuration)
                                }
                            }
                        })
                    })
                })
            })

            it(`each segment's two sets of notes have the same total duration`, () => {
                segments.forEach((segment: Segment): void => {
                    let segmentDuration: Ms = to.Ms(0)
                    segment.forEach((notes: Note[]): void => {
                        if (from.Ms(segmentDuration) === 0) {
                            segmentDuration = computeNotesTotalCompiledDuration(notes, scales)
                        }
                        else {
                            expect(
                                testIsCloseTo(
                                    from.Ms(computeNotesTotalCompiledDuration(notes, scales)),
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
                    const exemplaryNotesForSegment: Note[] = segment[ 0 ]
                    const totalDuration: Ms = computeNotesTotalCompiledDuration(exemplaryNotesForSegment, scales)

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

    const smoothSuite: (repetitions: Cardinal) => void =
        (repetitions: Cardinal): void => {
            it(`for each segment, its note's scalars are the sum of what they would have been in polyrhythmic mode as separate notes`, () => {
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(0)),
                    apply.Scalar(scalars[ 0 ], to.Scalar(from.Numerator(fractions[ 0 ][ 0 ]))),
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(1)),
                    apply.Scalar(scalars[ 1 ], to.Scalar(from.Denominator(fractions[ 0 ][ 1 ]))),
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(0)),
                    apply.Scalar(scalars[ 2 ], to.Scalar(from.Denominator(fractions[ 1 ][ 1 ]))),
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(1)),
                    apply.Scalar(scalars[ 1 ], to.Scalar(from.Numerator(fractions[ 1 ][ 0 ]))),
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(0)),
                    apply.Scalar(scalars[ 2 ], to.Scalar(from.Numerator(fractions[ 2 ][ 0 ]))),
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(1)),
                    apply.Scalar(scalars[ 3 ], to.Scalar(from.Denominator(fractions[ 2 ][ 1 ]))),
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(0)),
                    apply.Scalar(scalars[ 4 ], to.Scalar(from.Denominator(fractions[ 3 ][ 1 ]))),
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(1)),
                    apply.Scalar(scalars[ 3 ], to.Scalar(from.Numerator(fractions[ 3 ][ 0 ]))),
                )

                // Etcetera...
            })

            it('for each segment, both of its sets of notes have a count of notes equal to the repetition', () => {
                segments.forEach((segment: Segment): void => {
                    segment.forEach((notes: Note[]): void => {
                        expect(to.Cardinal(notes.length))
                            .toBe(repetitions)
                    })
                })
            })
        }

    const polyrhythmicSuite: (repetitions: Cardinal) => void =
        (repetitions: Cardinal): void => {
            it(`segments' note scalars follow an alternating pattern of incrementing along the scalars`, () => {
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(0)),
                    scalars[ 1 ],
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(0), to.Ordinal(1)),
                    scalars[ 0 ],
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(0)),
                    scalars[ 1 ],
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(1), to.Ordinal(1)),
                    scalars[ 2 ],
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(0)),
                    scalars[ 3 ],
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(2), to.Ordinal(1)),
                    scalars[ 2 ],
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(0)),
                    scalars[ 3 ],
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(3), to.Ordinal(1)),
                    scalars[ 4 ],
                )

                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(4), to.Ordinal(0)),
                    scalars[ 5 ],
                )
                testIsCloseTo(
                    computeDurationOfSegmentNote(to.Ordinal(4), to.Ordinal(1)),
                    scalars[ 4 ],
                )

                // Etcetera...
            })

            it(`for each segment, both of its sets of notes have a count of notes equal to the corresponding fractional part of that segment's fraction times the repetition`, () => {
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

    const computeDurationOfSegmentNote: (segmentIndex: Ordinal, entityIndex: Ordinal) => Scalar =
        (segmentIndex: Ordinal, entityIndex: Ordinal): Scalar => {
            const segment: Segment = apply.Ordinal(segments, segmentIndex)
            const notes: Note[] = apply.Ordinal(segment, entityIndex)
            const exampleNote: Note = notes[ 0 ]

            const duration: NoteFeature = exampleNote.duration!

            return duration.scalar!
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
