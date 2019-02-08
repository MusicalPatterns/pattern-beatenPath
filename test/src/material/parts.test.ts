import { NoteSpec } from '@musical-patterns/compiler'
import {
    apply,
    DictionaryOf,
    difference,
    entries,
    forEach,
    indexOfLastElement,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { BeatenPathSpec, buildParts, specData } from '../../../src/indexForTest'

describe('parts', () => {
    it('can reverse', () => {
        const forwardSpec: BeatenPathSpec = specData.initial
        const forwardVersion: DictionaryOf<NoteSpec[]> = buildParts(forwardSpec)

        const backwardSpec: BeatenPathSpec = { ...specData.initial, reverse: true }
        const backwardVersion: DictionaryOf<NoteSpec[]> = buildParts(backwardSpec)

        entries(forwardVersion)
            .forEach(([ partName, part ]: [ string, NoteSpec[] ]): void => {
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
