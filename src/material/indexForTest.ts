// tslint:disable no-reaching-imports

export { material } from './materials'
export { computeSegments } from './segments'
export { materializeEntities } from './entities'
export { computeNote } from './features'
export { computeNotes } from './notes'
export { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
export {
    computeCoreCycles,
    computeSegmentDurationIndices,
    computeSegmentNoteCounts,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentNoteCountsWithSegmentDurations,
    computeSegmentNoteCountsFromSegmentRatios,
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleTranslation,
    computeLoopCycledSegmentSegments,
    computeSegmentsDimensions,
    SegmentsDimensions,
    computeEntitiesNotes,
    BeatenPathEntitiesNotes,
    applySmooth,
    SmoothNotes,
    LoopSegmentCycleTranslation,
} from './custom/indexForTest'

export {
    CoreCycles,
} from './types'
