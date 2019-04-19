import { PitchDuration } from '@musical-patterns/material'
import {
    apply,
    Cardinal,
    ContourPiece,
    from,
    ofFrom,
    reciprocal,
    repeat,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>(repeat(
            [
                [
                    from.Scalar(reciprocal(notesDuration)),
                    from.Scalar(notesDuration),
                ],
            ],
            apply.Multiple(notesCount, to.Multiple(ofFrom(repetitions))),
        ))

const computeSmoothPiece: (computePieceParameters: {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>([
            [
                from.Scalar(reciprocal(notesDuration)),
                from.Scalar(apply.Scalar(
                    apply.Scalar(
                        notesDuration,
                        to.Scalar<Scalar>(from.Cardinal(repetitions)),
                    ),
                    to.Scalar<Scalar>(from.Cardinal(notesCount)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
