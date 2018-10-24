import { NotePropertySpec, NoteSpec, NoteSpecs } from '../../../src/compile/types'
import applyOffset from '../../../src/utilities/applyOffset'
import calculateNoteSpecsTotalScalarDuration from '../../../src/utilities/calculateNoteSpecsTotalScalarDuration'
import * as from from '../../../src/utilities/from'
import { Index, Scalar } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import testIsCloseTo from '../../../test/support/testIsCloseTo'
import { buildBeatenPathBlocks } from '../src/blocks'
import { buildBeatenPathDurationsAndRatios } from '../src/durationsAndRatios'
import { Block, Blocks, Core, Durations, DurationsAndRatios, Ratios } from '../src/types'
import * as beatenPathTo from '../src/utilities/to'

describe('beaten path blocks', () => {
    let beatenPathBlocks: Blocks
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratios

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
                    const noteSpecs: NoteSpecs = block[ from.Index(entityIndex) ]
                    const exampleNoteSpec: NoteSpec = noteSpecs[ 0 ]

                    const durationSpec: NotePropertySpec = exampleNoteSpec.durationSpec || {}

                    return durationSpec.scalar || to.Scalar(0)
                }

            it('each block has two sets of notes, one for each entity', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    expect(block.length).toBe(2)
                })
            })

            it('each set of notes in each block has notes which all have the same duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    block.forEach((noteSpecs: NoteSpecs): void => {
                        let noteDuration: Scalar = to.Scalar(0)
                        noteSpecs.forEach((noteSpec: NoteSpec): void => {
                            const durationSpec: NotePropertySpec | undefined = noteSpec.durationSpec
                            const durationSpecScalar: Scalar | undefined = durationSpec && durationSpec.scalar

                            if (durationSpecScalar) {
                                if (from.Scalar(noteDuration) === 0) {
                                    noteDuration = durationSpecScalar
                                }
                                else {
                                    expect(durationSpecScalar).toBe(noteDuration)
                                }
                            }
                        })
                    })
                })
            })

            it('each block\'s two sets of notes have the same total duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    let blockDuration: Scalar = to.Scalar(0)
                    block.forEach((noteSpecs: NoteSpecs): void => {
                        if (from.Scalar(blockDuration) === 0) {
                            blockDuration = calculateNoteSpecsTotalScalarDuration(noteSpecs)
                        }
                        else {
                            expect(testIsCloseTo(from.Scalar(calculateNoteSpecsTotalScalarDuration(noteSpecs)), from.Scalar(blockDuration))).toBeTruthy()
                        }
                    })
                })
            })

            it('each block has a different total duration than any other block', () => {
                const seenTotalDurations: Scalar[] = []
                beatenPathBlocks.forEach((block: Block): void => {
                    const exemplaryNotesForBlock: NoteSpecs = block[ 0 ]
                    const totalDuration: Scalar = calculateNoteSpecsTotalScalarDuration(exemplaryNotesForBlock)

                    seenTotalDurations.forEach((seenDuration: Scalar): void => {
                        expect(testIsCloseTo(from.Scalar(seenDuration), from.Scalar(totalDuration), true)).toBeTruthy()
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })

            it('blocks\'s note durations follow an alternating pattern of incrementing along the beaten path durations', () => {
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(0)), beatenPathDurations[ 0 ])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(1)), beatenPathDurations[ 1 ])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(0)), beatenPathDurations[ 2 ])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(1)), beatenPathDurations[ 1 ])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(0)), beatenPathDurations[ 2 ])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(1)), beatenPathDurations[ 3 ])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(0)), beatenPathDurations[ 4 ])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(1)), beatenPathDurations[ 3 ])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(0)), beatenPathDurations[ 4 ])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(1)), beatenPathDurations[ 5 ])).toBeTruthy()

                // Etcetera...
            })
        })
    }
})
