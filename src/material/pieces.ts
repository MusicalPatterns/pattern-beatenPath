import { PitchDuration } from '@musical-patterns/material'
import { as, Cardinal, ContourPiece, notAs, reciprocal, repeat, Scalar, use } from '@musical-patterns/utilities'
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
                    notAs.Scalar(reciprocal(notesDuration)),
                    notAs.Scalar(notesDuration),
                ],
            ],
            use.Multiple(
                pieceLength,
                as.Multiple<PieceLength>(notAs.Cardinal(repetitions)),
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
                notAs.Scalar(reciprocal(notesDuration)),
                notAs.Scalar(use.Scalar(
                    use.Scalar(
                        notesDuration,
                        as.Scalar<Scalar>(notAs.Cardinal(repetitions)),
                    ),
                    as.Scalar<Scalar>(notAs.Cardinal(pieceLength)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
