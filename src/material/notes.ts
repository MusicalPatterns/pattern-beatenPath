import { Note } from '@musical-patterns/material'
import { Cardinal, Scalar } from '@musical-patterns/utilities'
import { Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { PieceLength } from '../types'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputeNotesParameters, ComputePiece } from './types'

const computeNotes: (parameters: {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}) => Note[] =
    ({ style, pieceLength, notesValue, repetitions }: ComputeNotesParameters): Note[] => {
        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        return computePiece({
            notesValue,
            pieceLength,
            repetitions,
        })
            .map(computeNote)
    }

export {
    computeNotes,
}
