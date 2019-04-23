import { Entity, PitchDuration, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Fraction, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Core, Repetition } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { PieceLength } from '../types'

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
    notesDuration: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
}

interface ComputeNotesParameters {
    notesDuration: Scalar,
    pieceLength: PieceLength,
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
