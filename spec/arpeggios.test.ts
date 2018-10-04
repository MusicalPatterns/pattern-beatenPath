import calculateNotesDuration from '../../../src/utilities/calculateNotesDuration'
import sequence from '../../../src/utilities/sequence'
import { Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import * as from from '../../../src/utilities/from'
import { Notes } from '../../../src/types'
import testIsCloseTo from '../../../spec/support/testIsCloseTo'
import { buildArpeggioNoteBlocks } from '../src/arpeggios'
import { beatenPathDurationsAndRatiosByCore } from '../src/durations'
import { buildBeatenPathNoteBlocks } from '../src/notes'

describe('arpeggios', () => {
    let arpeggioNoteBlocks: Notes[]
    let beatenPathNoteBlocks: Notes[][]

    beforeEach(() => {
        const data = beatenPathDurationsAndRatiosByCore(5)
        const beatenPathRatios = data.beatenPathRatios
        const beatenPathDurations = data.beatenPathDurations
        beatenPathNoteBlocks = buildBeatenPathNoteBlocks(beatenPathDurations, beatenPathRatios)
        arpeggioNoteBlocks = buildArpeggioNoteBlocks(beatenPathRatios, beatenPathNoteBlocks)
    })

    it('there are the same total number of arpeggio blocks as there are note blocks', () => {
        expect(arpeggioNoteBlocks.length).toBe(beatenPathNoteBlocks.length)
    })

    it('the total duration of all arpeggio blocks is the same as the total duration of all note blocks', () => {
        const totalBeatenPathNotesDuration: Time = beatenPathNoteBlocks.reduce((totalDuration: Time, notesBlock: Notes[]): Time => {
            return to.Time(from.Time(totalDuration) + from.Time(calculateNotesDuration(notesBlock[0])))
        }, to.Time(0))

        expect(testIsCloseTo(from.Time(calculateNotesDuration(sequence(arpeggioNoteBlocks))), from.Time(totalBeatenPathNotesDuration)))
    })

    it('each arpeggio block is the same total duration as the corresponding notes block', () => {
        arpeggioNoteBlocks.forEach((block: Notes, index: number): void => {
            expect(
                testIsCloseTo(
                    from.Time(calculateNotesDuration(block)),
                    from.Time(calculateNotesDuration(beatenPathNoteBlocks[index][0])),
                ),
            ).toBeTruthy(`arpeggio block ${index}\'s duration did not match`)
        })
    })

    it('each arpeggio block should have n * m total notes, where n / m is the polyrhythm of the current note block', () => {
        arpeggioNoteBlocks.forEach((block: Notes, index: number): void => {
            expect(block.length).toBe(beatenPathNoteBlocks[index][0].length * beatenPathNoteBlocks[index][1].length)
        })
    })

    it('each arpeggio block\'s notes should all be the same length as each other', () => {
        arpeggioNoteBlocks.forEach(block => {
            let noteDuration: Time = to.Time(0)
            block.forEach(note => {
                if (from.Time(noteDuration) === 0) {
                    noteDuration = note.duration
                } else {
                    expect(note.duration).toBe(noteDuration)
                }
            })
        })
    })
})
