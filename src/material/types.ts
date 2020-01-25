import { Entity, PitchValue, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Ordinal, Rational, Scalar } from '@musical-patterns/utilities'
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
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    repetitions: Cardinal<Repetition[]>,
    segmentIndex: Ordinal<Segment[]>,
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
}

interface ComputeNotesParameters {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Cardinal<Repetition[]>,
    style: BeatenPathStyle,
}

type ComputePiece = (computePieceParameters: ComputePieceParameters) => ContourPiece<PitchValue>

interface CoreCycles {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Rational>,
}

export {
    ComputeSegmentsParameters,
    ComputeSegmentParameters,
    ComputePieceParameters,
    ComputePiece,
    ComputeNotesParameters,
    CoreCycles,
}
