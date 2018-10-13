import testIsCloseTo from '../../../test/support/testIsCloseTo'
import { Note, Notes } from '../../../src/types'
import calculateNotesDuration from '../../../src/utilities/calculateNotesDuration'
import * as from from '../../../src/utilities/from'
import { Index, Time } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import * as to from '../../../src/utilities/to'
import { buildBeatenPathBlocks } from '../src/blocks'
import { buildBeatenPathDurationsAndRatios } from '../src/durationsAndRatios'
import { Block, Blocks, Core, Durations, DurationsAndRatios, Ratios } from '../src/types'
import * as beatenPathTo from '../src/utilities/to'

describe('beaten path blocks', () => {
    let beatenPathBlocks: Blocks
    let beatenPathDurations: Durations
    let beatenPathRatios: Ratios

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(7); core = offset(core, to.Offset(1))) {
        describe(`when core is ${core}`, () => {
            beforeEach(() => {
                const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(core)
                beatenPathDurations = durationsAndRatios.beatenPathDurations
                beatenPathRatios = durationsAndRatios.beatenPathRatios
                beatenPathBlocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)
            })

            const blockEntityDuration: (blockIndex: Index, entityIndex: Index) => Time =
                (blockIndex: Index, entityIndex: Index): Time =>
                    beatenPathBlocks[from.Index(blockIndex)][from.Index(entityIndex)][0].duration

            it('each block has two sets of notes, one for each entity', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    expect(block.length).toBe(2)
                })
            })

            it('each set of notes in each block has notes which all have the same duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    block.forEach((notes: Notes): void => {
                        let noteDuration: Time = to.Time(0)
                        notes.forEach((note: Note): void => {
                            if (from.Time(noteDuration) === 0) {
                                noteDuration = note.duration
                            }
                            else {
                                expect(note.duration).toBe(noteDuration)
                            }
                        })
                    })
                })
            })

            it('each block\'s two sets of notes have the same total duration', () => {
                beatenPathBlocks.forEach((block: Block): void => {
                    let blockDuration: Time = to.Time(0)
                    block.forEach((notes: Notes): void => {
                        if (from.Time(blockDuration) === 0) {
                            blockDuration = calculateNotesDuration(notes)
                        }
                        else {
                            expect(testIsCloseTo(from.Time(calculateNotesDuration(notes)), from.Time(blockDuration))).toBeTruthy()
                        }
                    })
                })
            })

            it('each block has a different total duration than any other block', () => {
                const seenTotalDurations: Time[] = []
                beatenPathBlocks.forEach((block: Block): void => {
                    const exemplaryNotesForBlock: Notes = block[0]
                    const totalDuration: Time = calculateNotesDuration(exemplaryNotesForBlock)

                    seenTotalDurations.forEach((seenDuration: Time): void => {
                        expect(testIsCloseTo(from.Time(seenDuration), from.Time(totalDuration), true)).toBeTruthy()
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })

            it('blocks\'s note durations follow an alternating pattern of incrementing along the beaten path durations', () => {
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(0)), beatenPathDurations[0])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(0), to.Index(1)), beatenPathDurations[1])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(0)), beatenPathDurations[2])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(1), to.Index(1)), beatenPathDurations[1])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(0)), beatenPathDurations[2])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(2), to.Index(1)), beatenPathDurations[3])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(0)), beatenPathDurations[4])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(3), to.Index(1)), beatenPathDurations[3])).toBeTruthy()

                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(0)), beatenPathDurations[4])).toBeTruthy()
                expect(testIsCloseTo(blockEntityDuration(to.Index(4), to.Index(1)), beatenPathDurations[5])).toBeTruthy()

                // Etcetera...
            })
        })
    }
})
