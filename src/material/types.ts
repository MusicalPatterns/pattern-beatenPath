import { PitchDuration } from '@musical-patterns/pattern'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Core } from '../nominals'
import { BeatenPathStyle } from '../spec'

interface ComputeSegmentsParameters {
    core: Core,
    entityCount: Cardinal,
    repetitions: Cardinal,
    style: BeatenPathStyle,
}

interface ComputeSegmentParameters {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal,
    repetitions: Cardinal,
    segmentIndex: Ordinal,
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}

type ComputePiece = (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchDuration>

interface CoreCycles {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
}

export {
    ComputeSegmentsParameters,
    ComputeSegmentParameters,
    ComputePieceParameters,
    ComputePiece,
    CoreCycles,
}
