import { computeNotesTotalDurationByScalar, Note, PitchDuration } from '@musical-patterns/material'
import { as, Cardinal, ContourPiece, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle, computeNotes, PieceLength, Repetition } from '../../../src/indexForTest'

describe('notes', () => {
    const pieceLength: PieceLength = as.Cardinal<ContourPiece<PitchDuration>>(3)
    const repetitions: Cardinal<Repetition[]> = as.Cardinal<Repetition[]>(2)
    const notesDuration: Scalar = as.Scalar(1.25)

    it('whether you pick smooth or polyrhythmic, the end result has the same total duration', () => {
        const polyrhythmicNotes: Note[] =
            computeNotes({ pieceLength, notesDuration, repetitions, style: BeatenPathStyle.POLYRHYTHMIC })
        const smoothNotes: Note[] =
            computeNotes({ pieceLength, notesDuration, repetitions, style: BeatenPathStyle.SMOOTH })

        expect(computeNotesTotalDurationByScalar(polyrhythmicNotes))
            .toEqual(computeNotesTotalDurationByScalar(smoothNotes))
    })
})
