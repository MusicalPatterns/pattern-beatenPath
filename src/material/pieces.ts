import { PitchValue } from '@musical-patterns/material'
import { as, Cardinal, ContourPiece, Maybe, reciprocal, repeat, Scalar, use } from '@musical-patterns/utilities'
import { Repetition, Repetitions } from '../nominals'
import { PieceLength } from '../types'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Repetitions,
}) => ContourPiece<PitchValue> =
    ({ notesValue, pieceLength, repetitions }: ComputePieceParameters): ContourPiece<PitchValue> =>
        as.ContourPiece<PitchValue>(repeat(
            [
                [
                    as.number(reciprocal(notesValue)),
                    as.number(notesValue),
                ],
            ],
            use.Multiple(
                pieceLength,
                as.Multiple<PieceLength>(as.number(repetitions || 1)),
            ),
        ))

const computeSmoothPiece: (computePieceParameters: {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Repetitions,
}) => ContourPiece<PitchValue> =
    ({ notesValue, pieceLength, repetitions }: ComputePieceParameters): ContourPiece<PitchValue> =>
        as.ContourPiece<PitchValue>([
            [
                as.number(reciprocal(notesValue)),
                as.number(use.Scalar(
                    use.Scalar(
                        notesValue,
                        as.Scalar<Scalar>(as.number(repetitions || 1)),
                    ),
                    as.Scalar<Scalar>(as.number(pieceLength)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
