import { computeNotesTotalDurationByScalar, Note } from '@musical-patterns/material'
import { Cardinal, Scalar, to } from '@musical-patterns/utilities'
import { BeatenPathStyle, computeNotes } from '../../../src/indexForTest'

describe('notes', () => {
    const notesCount: Cardinal = to.Cardinal(3)
    const repetitions: Cardinal = to.Cardinal(2)
    const notesDuration: Scalar = to.Scalar(1.25)

    it('whether you pick smooth or polyrhythmic, the end result has the same total duration', () => {
        const polyrhythmicNotes: Note[] =
            computeNotes({ notesCount, notesDuration, repetitions, style: BeatenPathStyle.POLYRHYTHMIC })
        const smoothNotes: Note[] =
            computeNotes({ notesCount, notesDuration, repetitions, style: BeatenPathStyle.SMOOTH })

        expect(computeNotesTotalDurationByScalar(polyrhythmicNotes))
            .toEqual(computeNotesTotalDurationByScalar(smoothNotes))
    })
})
