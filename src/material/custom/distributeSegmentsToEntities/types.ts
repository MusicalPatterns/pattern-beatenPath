import { Note, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, Ordinal, Translation } from '@musical-patterns/utilities'

interface DistributeSegmentToEntitiesParameters {
    existingEntitiesNotes: Note[][],
    segments: Segment[],
}

interface ComputeLoopCycledSegmentSegmentsParameters {
    loopIndex: Ordinal<LoopSegmentCycleTranslation>,
    loopSegmentCycleTranslation: LoopSegmentCycleTranslation,
    segments: Segment[],
}

interface SegmentsDimensions {
    cycleLength: Cardinal,
    entityCount: Cardinal,
}

type LoopSegmentCycleTranslation = Translation<Cycle<Note[]>>

export {
    DistributeSegmentToEntitiesParameters,
    ComputeLoopCycledSegmentSegmentsParameters,
    SegmentsDimensions,
    LoopSegmentCycleTranslation,
}
