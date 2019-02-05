import { NoteSpec } from '@musical-patterns/compiler'
import { DictionaryOf, entries } from '@musical-patterns/utilities'
import { BeatenPathSpec, buildParts, specData } from '../../../src/indexForTest'

describe('parts', () => {
    it('can reverse', () => {
        const forwardSpec: BeatenPathSpec = specData.initial
        const forwardVersion: DictionaryOf<NoteSpec[]> = buildParts(forwardSpec)

        const backwardSpec: BeatenPathSpec = { ...specData.initial, reverse: true }
        const backwardVersion: DictionaryOf<NoteSpec[]> = buildParts(backwardSpec)

        entries(forwardVersion)
            .forEach(([ partName, part ]: [ string, NoteSpec[] ]): void => {
                    part.forEach((note: NoteSpec, index: number) => {
                        expect(note)
                            .toEqual(backwardVersion[ partName ][ part.length - index - 1 ])
                    })
                },
            )
    })
})
