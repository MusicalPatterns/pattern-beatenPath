import { PitchDuration } from '@musical-patterns/pattern'
import { apply, ContourPiece, from, reciprocal, repeat, to } from '@musical-patterns/utilities'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration> =
    ({ scalar, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(scalar)),
                    from.Scalar(scalar),
                ],
            ],
            apply.Scalar(notesCount, to.Scalar(from.Cardinal(repetitions))),
        ))

const computeSmoothPiece: (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration> =
    ({ scalar, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(scalar)),
                    from.Scalar(apply.Scalar(scalar, to.Scalar(from.Cardinal(notesCount)))),
                ],
            ],
            repetitions,
        ))

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
