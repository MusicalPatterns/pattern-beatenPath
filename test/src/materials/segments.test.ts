import {
    applyOffset,
    from,
    Index,
    Maybe,
    NotePropertySpec,
    NoteSpec,
    Part,
    Scalar,
    Segment,
    SumOfScalars,
    to,
} from '../../../../../src/indexForTest'
import { calculatePartTotalScalarDuration, testIsCloseTo } from '../../../../../test'
import {
    buildBeatenPathDurationsAndRatios,
    buildBeatenPathSegments,
    Core,
    Durations,
    DurationsAndRatios,
    Ratio,
    to as beatenPathTo,
} from '../../../src/indexForTest'

describe('beaten path segments', () => {
    let beatenPathSegments: Segment[]
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratio[]

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = applyOffset(core, to.Offset(1))) {
        describe(`when core is ${core}`, () => {
            beforeEach(() => {
                const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
                beatenPathDurations = durationsAndRatios.beatenPathDurations
                beatenPathRatios = durationsAndRatios.beatenPathRatios
                beatenPathSegments = buildBeatenPathSegments(beatenPathDurations, beatenPathRatios)
            })

            const calculateSegmentDuration: (segmentIndex: Index, entityIndex: Index) => Scalar =
                (segmentIndex: Index, entityIndex: Index): Scalar => {
                    const segment: Segment = beatenPathSegments[ from.Index(segmentIndex) ]
                    const part: Part = segment[ from.Index(entityIndex) ]
                    const exampleNoteSpec: NoteSpec = part[ 0 ]

                    const durationSpec: NotePropertySpec = exampleNoteSpec.durationSpec || {}

                    return durationSpec.scalar || to.Scalar(0)
                }

            it('each segment has two sets of notes, one for each entity', () => {
                beatenPathSegments.forEach((segment: Segment): void => {
                    expect(segment.length)
                        .toBe(2)
                })
            })

            it('each set of notes in each segment has notes which all have the same duration', () => {
                beatenPathSegments.forEach((segment: Segment): void => {
                    segment.forEach((part: Part): void => {
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
                beatenPathSegments.forEach((segment: Segment): void => {
                    let segmentDuration: SumOfScalars = to.SumOfScalars(0)
                    segment.forEach((part: Part): void => {
                        if (from.SumOfScalars(segmentDuration) === 0) {
                            segmentDuration = calculatePartTotalScalarDuration(part)
                        }
                        else {
                            expect(
                                testIsCloseTo(
                                    from.SumOfScalars(calculatePartTotalScalarDuration(part)),
                                    from.SumOfScalars(segmentDuration),
                                ),
                            )
                                .toBeTruthy()
                        }
                    })
                })
            })

            it('each segment has a different total duration than any other segment', () => {
                const seenTotalDurations: SumOfScalars[] = []
                beatenPathSegments.forEach((segment: Segment): void => {
                    const exemplaryNotesForSegment: Part = segment[ 0 ]
                    const totalDuration: SumOfScalars = calculatePartTotalScalarDuration(exemplaryNotesForSegment)

                    seenTotalDurations.forEach((seenDuration: SumOfScalars): void => {
                        expect(
                            testIsCloseTo(
                                from.SumOfScalars(seenDuration),
                                from.SumOfScalars(totalDuration),
                                true,
                            ))
                            .toBeTruthy()
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })

            it('segments\'s note durations follow an alternating pattern of incrementing along the beaten path durations', () => {
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(0), to.Index(0)), beatenPathDurations[ 0 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(0), to.Index(1)), beatenPathDurations[ 1 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(calculateSegmentDuration(to.Index(1), to.Index(0)), beatenPathDurations[ 2 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(1), to.Index(1)), beatenPathDurations[ 1 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(calculateSegmentDuration(to.Index(2), to.Index(0)), beatenPathDurations[ 2 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(2), to.Index(1)), beatenPathDurations[ 3 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(calculateSegmentDuration(to.Index(3), to.Index(0)), beatenPathDurations[ 4 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(3), to.Index(1)), beatenPathDurations[ 3 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(calculateSegmentDuration(to.Index(4), to.Index(0)), beatenPathDurations[ 4 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(calculateSegmentDuration(to.Index(4), to.Index(1)), beatenPathDurations[ 5 ]))
                    .toBeTruthy()

                // Etcetera...
            })
        })
    }
})
