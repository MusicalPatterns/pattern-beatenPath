import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { Cardinal, Ordinal, Translation } from '@musical-patterns/utilities'

interface DistributeSegmentToEntitiesParameters {
    existingEntitiesNotes: Note[][],
    segments: Segment[],
}

interface ComputeLoopCycledSegmentSegmentsParameters {
    loopIndex: Ordinal,
    loopSegmentCycleTranslations: Translation,
    segments: Segment[],
}

interface SegmentsDimensions {
    cycleLength: Cardinal,
    entityCount: Cardinal,
}

export {
    DistributeSegmentToEntitiesParameters,
    ComputeLoopCycledSegmentSegmentsParameters,
    SegmentsDimensions,
}
