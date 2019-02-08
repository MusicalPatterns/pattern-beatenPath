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
            apply.Cardinal(notesCount, repetitions),
        ))

const buildSmoothPiece: (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration> =
    ({ durationScalar, notesCount, repetitions }: BuildPieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(durationScalar)),
                    from.Scalar(apply.Cardinal(durationScalar, notesCount)),
                ],
            ],
            repetitions,
        ))

export {
    buildPolyrhythmicPiece,
    buildSmoothPiece,
}
