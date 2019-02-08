import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Ratio, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../types'

interface BuildSegmentsParameters {
    durations: Scalar[],
    ratios: Ratio[],
    repetitions: Cardinal,
    style: BeatenPathStyle,
}

interface BuildPieceParameters {
    durationScalar: Scalar,
    notesCount: Cardinal,
    repetitions: Cardinal,
}

type BuildPiece = (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration>

export {
    BuildSegmentsParameters,
    BuildPieceParameters,
    BuildPiece,
}
