import { PitchDuration } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    ContourPiece,
    notAs,
    ofNotAs,
    reciprocal,
    repeat,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { ComputePieceParameters } from './types'

const computePolyrhythmicPiece: (computePieceParameters: {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>(repeat(
            [
                [
                    notAs.Scalar(reciprocal(notesDuration)),
                    notAs.Scalar(notesDuration),
                ],
            ],
            use.Multiple(notesCount, as.Multiple(ofNotAs(repetitions))),
        ))

const computeSmoothPiece: (computePieceParameters: {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}) => ContourPiece<PitchDuration> =
    ({ notesDuration, notesCount, repetitions }: ComputePieceParameters): ContourPiece<PitchDuration> =>
        as.ContourPiece<PitchDuration>([
            [
                notAs.Scalar(reciprocal(notesDuration)),
                notAs.Scalar(use.Scalar(
                    use.Scalar(
                        notesDuration,
                        as.Scalar<Scalar>(notAs.Cardinal(repetitions)),
                    ),
                    as.Scalar<Scalar>(notAs.Cardinal(notesCount)),
                )),
            ],
        ])

export {
    computePolyrhythmicPiece,
    computeSmoothPiece,
}
