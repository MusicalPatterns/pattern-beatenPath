import { PitchDuration } from '@musical-patterns/pattern'
import { apply, ContourPiece, from, reciprocal, repeat, to } from '@musical-patterns/utilities'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(notesDuration)),
                    from.Scalar(notesDuration),
                ],
            ],
            apply.Scalar(notesCount, to.Scalar(from.Cardinal(repetitions))),
        ))

const computeSmoothPiece: (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(notesDuration)),
                    from.Scalar(apply.Scalar(notesDuration, to.Scalar(from.Cardinal(notesCount)))),
                ],
            ],
            repetitions,
        ))

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
