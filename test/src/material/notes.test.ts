import { Note } from '@musical-patterns/compiler'
import { apply, difference, entries, forEach, indexOfLastElement, Ordinal } from '@musical-patterns/utilities'
import { BeatenPathEntity, BeatenPathEntityNotes, BeatenPathSpec, computeNotes, data } from '../../../src/indexForTest'

describe('notes', () => {
    it('can reverse', () => {
        const forwardSpec: BeatenPathSpec = data.initial
        const forwardVersion: BeatenPathEntityNotes = computeNotes(forwardSpec)

        const backwardSpec: BeatenPathSpec = { ...data.initial, reverse: true }
        const backwardVersion: BeatenPathEntityNotes = computeNotes(backwardSpec)

        entries(forwardVersion)
            .forEach(([ notesName, notes ]: [ BeatenPathEntity, Note[] ]): void => {
                forEach(notes, (note: Note, index: Ordinal) => {
                    const backwardNotes: Note[] = backwardVersion[ notesName ]
                    const mirroredIndex: Ordinal = difference(indexOfLastElement(notes), index)
                    const mirroredNote: Note = apply.Ordinal(backwardNotes, mirroredIndex)

                    expect(note)
                        .toEqual(mirroredNote)
                })
            })
    })
})
