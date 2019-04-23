import { Note } from '@musical-patterns/material'
import { Cardinal, Scalar } from '@musical-patterns/utilities'
import { Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { PieceLength } from '../types'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputeNotesParameters, ComputePiece } from './types'

const computeNotes: (parameters: {
    notesDuration: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}) => Note[] =
    ({ style, pieceLength, notesDuration, repetitions }: ComputeNotesParameters): Note[] => {
        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        return computePiece({
            notesDuration,
            pieceLength,
            repetitions,
        })
            .map(computeNote)
    }

export {
    computeNotes,
}
