import { PitchDuration } from '@musical-patterns/pattern'
import { apply, ContourPiece, from, reciprocal, repeat, to } from '@musical-patterns/utilities'
import { BuildPieceParameters } from './types'

const buildPolyrhythmicPiece: (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration> =
    ({ scalar, notesCount, repetitions }: BuildPieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(scalar)),
                    from.Scalar(scalar),
                ],
            ],
            apply.Scalar(notesCount, to.Scalar(from.Cardinal(repetitions))),
        ))

const buildSmoothPiece: (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration> =
    ({ scalar, notesCount, repetitions }: BuildPieceParameters): ContourPiece<PitchDuration> =>
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
    buildPolyrhythmicPiece,
    buildSmoothPiece,
}
