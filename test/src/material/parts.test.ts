import { NoteSpec } from '@musical-patterns/compiler'
import { apply, difference, entries, forEach, indexOfLastElement, Ordinal } from '@musical-patterns/utilities'
import { BeatenPathPart, BeatenPathParts, BeatenPathSpec, buildParts, data } from '../../../src/indexForTest'

describe('parts', () => {
    it('can reverse', () => {
        const forwardSpec: BeatenPathSpec = data.initial
        const forwardVersion: BeatenPathParts = buildParts(forwardSpec)

        const backwardSpec: BeatenPathSpec = { ...data.initial, reverse: true }
        const backwardVersion: BeatenPathParts = buildParts(backwardSpec)

        entries(forwardVersion)
            .forEach(([ partName, part ]: [ BeatenPathPart, NoteSpec[] ]): void => {
                forEach(part, (note: NoteSpec, index: Ordinal) => {
                    const backwardPart: NoteSpec[] = backwardVersion[ partName ]
                    const mirroredIndex: Ordinal = difference(indexOfLastElement(part), index)
                    const mirroredNote: NoteSpec = apply.Ordinal(backwardPart, mirroredIndex)

                    expect(note)
                        .toEqual(mirroredNote)
                })
            })
    })
})
