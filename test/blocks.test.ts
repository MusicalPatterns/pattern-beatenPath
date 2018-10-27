import {
    applyOffset,
    from,
    Index,
    Maybe,
    NotePropertySpec,
    NoteSpec,
    Scalar,
    SumOfScalars,
    to,
} from '../../../src/indexForTest'
import { calculateNoteSpecsTotalScalarDuration, testIsCloseTo } from '../../../test'
import {
    Block,
    Blocks,
    buildBeatenPathBlocks,
    buildBeatenPathDurationsAndRatios,
    Core,
    Durations,
    DurationsAndRatios,
    Ratio,
    to as beatenPathTo,
} from '../src/indexForTest'

describe('beaten path blocks', () => {
    let beatenPathBlocks: Blocks
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratio[]

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = applyOffset(core, to.Offset(1))) {
        describe(`when core is ${core}`, () => {
            beforeEach(() => {
                const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
                beatenPathDurations = durationsAndRatios.beatenPathDurations
                beatenPathRatios = durationsAndRatios.beatenPathRatios
                beatenPathBlocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)
            })

            const blockEntityDuration: (blockIndex: Index, entityIndex: Index) => Scalar =
                (blockIndex: Index, entityIndex: Index): Scalar => {
                    const block: Block = beatenPathBlocks[ from.Index(blockIndex) ]
                    const noteSpecs: NoteSpec[] = block[ from.Index(entityIndex) ]
                    const exampleNoteSpec: NoteSpec = noteSpecs[ 0 ]

                    const durationSpec: NotePropertySpec = exampleNoteSpec.durationSpec || {}

                    return durationSpec.scalar || to.Scalar(0)
                }

            it('each block has two sets of notes, one for each entity', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    expect(block.length)
                        .toBe(2)
                })
            })

            it('each set of notes in each block has notes which all have the same duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    block.forEach((noteSpecs: NoteSpec[]): void => {
                        let noteDuration: Scalar = to.Scalar(0)
                        noteSpecs.forEach((noteSpec: NoteSpec): void => {
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

            it('each block\'s two sets of notes have the same total duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    let blockDuration: SumOfScalars = to.SumOfScalars(0)
                    block.forEach((noteSpecs: NoteSpec[]): void => {
                        if (from.SumOfScalars(blockDuration) === 0) {
                            blockDuration = calculateNoteSpecsTotalScalarDuration(noteSpecs)
                        }
                        else {
                            expect(
                                testIsCloseTo(
                                    from.SumOfScalars(calculateNoteSpecsTotalScalarDuration(noteSpecs)),
                                    from.SumOfScalars(blockDuration),
                                ),
                            )
                                .toBeTruthy()
                        }
                    })
                })
            })

            it('each block has a different total duration than any other block', () => {
                const seenTotalDurations: SumOfScalars[] = []
                beatenPathBlocks.forEach((block: Block): void => {
                    const exemplaryNotesForBlock: NoteSpec[] = block[ 0 ]
                    const totalDuration: SumOfScalars = calculateNoteSpecsTotalScalarDuration(exemplaryNotesForBlock)

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

            it('blocks\'s note durations follow an alternating pattern of incrementing along the beaten path durations', () => {
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(0)), beatenPathDurations[ 0 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(1)), beatenPathDurations[ 1 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(0)), beatenPathDurations[ 2 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(1)), beatenPathDurations[ 1 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(0)), beatenPathDurations[ 2 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(1)), beatenPathDurations[ 3 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(0)), beatenPathDurations[ 4 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(1)), beatenPathDurations[ 3 ]))
                    .toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(0)), beatenPathDurations[ 4 ]))
                    .toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(1)), beatenPathDurations[ 5 ]))
                    .toBeTruthy()

                // Etcetera...
            })
        })
    }
})
