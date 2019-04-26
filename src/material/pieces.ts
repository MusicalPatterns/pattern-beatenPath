import { PitchDuration } from '@musical-patterns/material'
import { as, Cardinal, ContourPiece, reciprocal, repeat, Scalar, use } from '@musical-patterns/utilities'
import { Repetition } from '../nominals'
import { PieceLength } from '../types'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: {
    notesDuration: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, pieceLength, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>(repeat(
            [
                [
                    as.number(reciprocal(notesDuration)),
                    as.number(notesDuration),
                ],
            ],
            use.Multiple(
                pieceLength,
                as.Multiple<PieceLength>(as.number(repetitions)),
            ),
        ))

const computeSmoothPiece: (computePieceParameters: {
    notesDuration: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, pieceLength, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>([
            [
                as.number(reciprocal(notesDuration)),
                as.number(use.Scalar(
                    use.Scalar(
                        notesDuration,
                        as.Scalar<Scalar>(as.number(repetitions)),
                    ),
                    as.Scalar<Scalar>(as.number(pieceLength)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
