import { Note } from '@musical-patterns/compiler'
import { BeatenPathStyle } from '../spec'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputeNotesParameters, ComputePiece } from './types'

const computeNotes: (parameters: ComputeNotesParameters) => Note[] =
    ({ style, notesCount, notesDuration, repetitions }: ComputeNotesParameters): Note[] => {
        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        return computePiece({
            notesCount,
            notesDuration,
            repetitions,
        })
            .map(computeNote)
    }

export {
    computeNotes,
}
