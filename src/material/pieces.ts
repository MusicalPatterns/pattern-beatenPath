import { PitchDuration } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    ContourElement,
    ContourPiece,
    notAs,
    reciprocal,
    repeat,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { Repetition } from '../nominals'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: {
    contourLength: Cardinal<ContourPiece<PitchDuration>>,
    notesDuration: Scalar,
    repetitions: Cardinal<Repetition[]>,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, contourLength, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>(repeat(
            [
                [
                    notAs.Scalar(reciprocal(notesDuration)),
                    notAs.Scalar(notesDuration),
                ],
            ],
            use.Multiple(
                contourLength,
                as.Multiple<Cardinal<ContourPiece<PitchDuration>>>(notAs.Cardinal(repetitions)),
            ),
        ))

const computeSmoothPiece: (computePieceParameters: {
    contourLength: Cardinal<ContourPiece<PitchDuration>>,
    notesDuration: Scalar,
    repetitions: Cardinal<Repetition[]>,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, contourLength, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>([
            [
                notAs.Scalar(reciprocal(notesDuration)),
                notAs.Scalar(use.Scalar(
                    use.Scalar(
                        notesDuration,
                        as.Scalar<Scalar>(notAs.Cardinal(repetitions)),
                    ),
                    as.Scalar<Scalar>(notAs.Cardinal(contourLength)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
