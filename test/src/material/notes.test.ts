import { computeNotesValueScalarSum, Note, PitchValue } from '@musical-patterns/material'
import { as, ContourPiece, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle, computeNotes, PieceLength, Repetition, Repetitions } from '../../../src/indexForTest'

describe('notes', (): void => {
    const pieceLength: PieceLength = as.Cardinal<ContourPiece<PitchValue>>(3)
    const repetitions: Repetitions = as.Cardinal<Repetition[]>(2)
    const notesValue: Scalar = as.Scalar(1.25)

    it('whether you pick smooth or polyrhythmic, the end result has the same total value', (): void => {
        const polyrhythmicNotes: Note[] =
            computeNotes({ pieceLength, notesValue, repetitions, style: BeatenPathStyle.POLYRHYTHMIC })
        const smoothNotes: Note[] =
            computeNotes({ pieceLength, notesValue, repetitions, style: BeatenPathStyle.SMOOTH })

        expect(computeNotesValueScalarSum(polyrhythmicNotes))
            .toEqual(computeNotesValueScalarSum(smoothNotes))
    })
})
