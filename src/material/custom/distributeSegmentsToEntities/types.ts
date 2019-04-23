import { Entity, Note, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Ordinal } from '@musical-patterns/utilities'

interface DistributeSegmentToEntitiesParameters {
    existingEntitiesNotes: Note[][],
    segments: Segment[],
}

interface ComputeLoopCycledSegmentSegmentsParameters {
    loopIndex: Ordinal<LoopSegmentCycleShift[]>,
    loopSegmentCycleShift: LoopSegmentCycleShift,
    segments: Segment[],
}

interface SegmentsDimensions {
    cycleLength: Cardinal<Segment[]>,
    entityCount: Cardinal<Entity[]>,
}

type LoopSegmentCycleShift = Cardinal<Cycle<Note[]>>

export {
    DistributeSegmentToEntitiesParameters,
    ComputeLoopCycledSegmentSegmentsParameters,
    SegmentsDimensions,
    LoopSegmentCycleShift,
}
