import { NoteSpec } from '@musical-patterns/compiler'
import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Fraction, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'

interface BuildSegmentsParameters {
    fractions: Fraction[],
    repetitions: Cardinal,
    scalars: Scalar[],
    style: BeatenPathStyle,
}

interface BuildPieceParameters {
    notesCount: Cardinal,
    repetitions: Cardinal,
    scalar: Scalar,
}

type BuildPiece = (buildPieceParameters: BuildPieceParameters) => ContourPiece<PitchDuration>

interface FractionsAndScalars {
    fractions: Fraction[],
    scalars: Scalar[],
}

enum BeatenPathPart {
    FIRST_PART = 'FIRST_PART',
    SECOND_PART = 'SECOND_PART',
}

type BeatenPathParts = { [key in BeatenPathPart]: NoteSpec[] }

export {
    BuildSegmentsParameters,
    BuildPieceParameters,
    BuildPiece,
    FractionsAndScalars,
    BeatenPathParts,
    BeatenPathPart,
}
