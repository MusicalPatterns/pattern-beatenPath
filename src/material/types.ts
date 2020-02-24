import { Entity, PitchValue, Segment } from '@musical-patterns/material'
import { Cardinal, ContourPiece, Cycle, Ordinal, Rational, Scalar } from '@musical-patterns/utilities'
import { Core, Repetitions } from '../nominals'
import { BeatenPathStyle } from '../spec'
import { PieceLength } from '../types'

interface ComputeSegmentsParameters {
    core: Core,
    entityCount: Cardinal<Entity[]>,
    repetitions: Repetitions,
    style: BeatenPathStyle,
}

interface ComputeSegmentParameters {
    coreDurations: Cycle<Scalar>,
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    repetitions: Repetitions,
    segmentIndex: Ordinal<Segment[]>,
    style: BeatenPathStyle,
}

interface ComputePieceParameters {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Repetitions,
}

interface ComputeNotesParameters {
    notesValue: Scalar,
    pieceLength: PieceLength,
    repetitions: Repetitions,
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
