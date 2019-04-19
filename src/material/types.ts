import { Entity, PitchDuration, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Core } from '../nominals'
import { BeatenPathStyle } from '../spec'

interface ComputeSegmentsParameters {
    core: Core,
    entityCount: Cardinal<Entity>,
    repetitions: Cardinal,
    style: BeatenPathStyle,
}

interface ComputeSegmentParameters {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity>,
    repetitions: Cardinal,
    segmentIndex: Ordinal<Segment>,
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
}

interface ComputeNotesParameters {
    notesCount: Cardinal,
    notesDuration: Scalar,
    repetitions: Cardinal,
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
