import { Entity, PitchDuration, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Core, Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'

interface ComputeSegmentsParameters {
    core: Core,
    entityCount: Cardinal<Entity[]>,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}

interface ComputeSegmentParameters {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    repetitions: Cardinal<Repetition[]>,
    segmentIndex: Ordinal<Segment[]>,
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    contourLength: Cardinal<ContourPiece<PitchDuration>>,
    notesDuration: Scalar,
    repetitions: Cardinal<Repetition[]>,
}

interface ComputeNotesParameters {
    contourLength: Cardinal<ContourPiece<PitchDuration>>,
    notesDuration: Scalar,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
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
    ComputeNotesParameters,
    CoreCycles,
}
