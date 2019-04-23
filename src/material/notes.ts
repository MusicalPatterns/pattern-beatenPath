import { Note, PitchDuration } from '@musical-patterns/material'
import { Cardinal, ContourElement, ContourPiece, Scalar } from '@musical-patterns/utilities'
import { Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { computeNote } from './features'
import { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
import { ComputeNotesParameters, ComputePiece } from './types'

const computeNotes: (parameters: {
    contourLength: Cardinal<ContourPiece<PitchDuration>>,
    notesDuration: Scalar,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}) => Note[] =
    ({ style, contourLength, notesDuration, repetitions }: ComputeNotesParameters): Note[] => {
        const computePiece: ComputePiece =
            style === BeatenPathStyle.POLYRHYTHMIC ? computePolyrhythmicPiece : computeSmoothPiece

        return computePiece({
            contourLength,
            notesDuration,
            repetitions,
        })
            .map(computeNote)
    }

export {
    computeNotes,
}
