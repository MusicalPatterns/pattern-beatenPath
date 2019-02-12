import { PitchDuration } from '@musical-patterns/pattern'
import { apply, ContourPiece, from, reciprocal, repeat, to } from '@musical-patterns/utilities'
import { BuildPieceParameters } from './types'

const buildPolyrhythmicPiece: (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration> =
    ({ durationScalar, notesCount, repetitions }: BuildPieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(durationScalar)),
                    from.Scalar(durationScalar),
                ],
            ],
            apply.Scalar(notesCount, to.Scalar(from.Cardinal(repetitions))),
        ))

const buildSmoothPiece: (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration> =
    ({ durationScalar, notesCount, repetitions }: BuildPieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(durationScalar)),
                    from.Scalar(apply.Scalar(durationScalar, to.Scalar(from.Cardinal(notesCount)))),
                ],
            ],
            repetitions,
        ))

export {
    buildPolyrhythmicPiece,
    buildSmoothPiece,
}
