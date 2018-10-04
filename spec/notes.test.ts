import testIsCloseTo from '../../../spec/support/testIsCloseTo'
import { Note, Notes } from '../../../src/types'
import calculateNotesDuration from '../../../src/utilities/calculateNotesDuration'
import * as from from '../../../src/utilities/from'
import { Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { buildBeatenPathDurationsAndRatios } from '../src/durations'
import { buildBeatenPathNoteBlocks } from '../src/notes'
import { DurationsAndRatios } from '../src/types'

describe('beaten path notes', () => {
    let beatenPathNoteBlocks: Notes[][]
    let beatenPathDurations: number[]
    let beatenPathRatios: number[][]

    beforeEach(() => {
        const durationsAndRatios: DurationsAndRatios = buildBeatenPathDurationsAndRatios(5)
        beatenPathDurations = durationsAndRatios.beatenPathDurations
        beatenPathRatios = durationsAndRatios.beatenPathRatios
        beatenPathNoteBlocks = buildBeatenPathNoteBlocks(beatenPathDurations, beatenPathRatios)
    })

    const blockEntityDuration: (block: number, entity: number) => number =
        (block: number, entity: number): number => from.Time(beatenPathNoteBlocks[block][entity][0].duration)

    it('each block has two sets of notes, one for each entity', () => {
        beatenPathNoteBlocks.forEach((block: Notes[]): void => {
            expect(block.length).toBe(2)
        })
    })

    it('each set of notes in each block has notes which all have the same duration', () => {
        beatenPathNoteBlocks.forEach((block: Notes[]): void => {
            block.forEach((notes: Notes): void => {
                let noteDuration: Time = to.Time(0)
                notes.forEach((note: Note): void => {
                    if (from.Time(noteDuration) === 0) {
                        noteDuration = note.duration
                    } else {
                        expect(note.duration).toBe(noteDuration)
                    }
                })
            })
        })
    })

    it('each block\'s two sets of notes have the same total duration', () => {
        beatenPathNoteBlocks.forEach((block: Notes[]): void => {
            let blockDuration: Time = to.Time(0)
            block.forEach((notes: Notes): void => {
                if (from.Time(blockDuration) === 0) {
                    blockDuration = calculateNotesDuration(notes)
                } else {
                    expect(testIsCloseTo(from.Time(calculateNotesDuration(notes)), from.Time(blockDuration))).toBeTruthy()
                }
            })
        })
    })

    it('each block has a different total duration than any other block', () => {
        const seenTotalDurations: Time[] = []
        beatenPathNoteBlocks.forEach((block: Notes[]): void => {
            const exemplaryNotesForBlock: Notes = block[0]
            const totalDuration: Time = calculateNotesDuration(exemplaryNotesForBlock)

            seenTotalDurations.forEach((seenDuration: Time): void => {
                expect(testIsCloseTo(from.Time(seenDuration), from.Time(totalDuration), true)).toBeTruthy()
            })

            seenTotalDurations.push(totalDuration)
        })
    })

    it('blocks\'s note durations follow an alternating pattern of incrementing along the beaten path durations', () => {
        expect(testIsCloseTo(blockEntityDuration(0, 0), beatenPathDurations[0] * 100)).toBeTruthy()
        expect(testIsCloseTo(blockEntityDuration(0, 1), beatenPathDurations[1] * 100)).toBeTruthy()

        expect(testIsCloseTo(blockEntityDuration(1, 0), beatenPathDurations[2] * 100)).toBeTruthy()
        expect(testIsCloseTo(blockEntityDuration(1, 1), beatenPathDurations[1] * 100)).toBeTruthy()

        expect(testIsCloseTo(blockEntityDuration(2, 0), beatenPathDurations[2] * 100)).toBeTruthy()
        expect(testIsCloseTo(blockEntityDuration(2, 1), beatenPathDurations[3] * 100)).toBeTruthy()

        expect(testIsCloseTo(blockEntityDuration(3, 0), beatenPathDurations[4] * 100)).toBeTruthy()
        expect(testIsCloseTo(blockEntityDuration(3, 1), beatenPathDurations[3] * 100)).toBeTruthy()

        expect(testIsCloseTo(blockEntityDuration(4, 0), beatenPathDurations[4] * 100)).toBeTruthy()
        expect(testIsCloseTo(blockEntityDuration(4, 1), beatenPathDurations[5] * 100)).toBeTruthy()
    })
})
