import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Ratio, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'

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

interface DurationsAndRatios {
    durations: Scalar[],
    ratios: Ratio[],
}

export {
    BuildSegmentsParameters,
    BuildPieceParameters,
    BuildPiece,
    DurationsAndRatios,
}
