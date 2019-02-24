import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Fraction, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'

interface BuildSegmentsParameters {
    durations: Scalar[],
    fractions: Fraction[],
    repetitions: Cardinal,
    style: BeatenPathStyle,
}

interface BuildPieceParameters {
    durationScalar: Scalar,
    notesCount: Cardinal,
    repetitions: Cardinal,
}

type BuildPiece = (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration>

interface DurationsAndFractions {
    durations: Scalar[],
    fractions: Fraction[],
}

export {
    BuildSegmentsParameters,
    BuildPieceParameters,
    BuildPiece,
    DurationsAndFractions,
}
