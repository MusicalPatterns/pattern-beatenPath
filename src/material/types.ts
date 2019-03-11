import { Note } from '@musical-patterns/compiler'
import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Fraction, Scalar } from '@musical-patterns/utilities'
import { BeatenPathStyle } from '../spec'

interface ComputeSegmentsParameters {
    fractions: Fraction[],
    repetitions: Cardinal,
    scalars: Scalar[],
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    notesCount: Cardinal,
    repetitions: Cardinal,
    scalar: Scalar,
}

type ComputePiece = (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration>

interface FractionsAndScalars {
    fractions: Fraction[],
    scalars: Scalar[],
}

enum BeatenPathEntity {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
}

type BeatenPathEntityNotes = { [Index in BeatenPathEntity]: Note[] }

export {
    ComputeSegmentsParameters,
    ComputePieceParameters,
    ComputePiece,
    FractionsAndScalars,
    BeatenPathEntityNotes,
    BeatenPathEntity,
}
