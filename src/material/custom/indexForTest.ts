// tslint:disable no-reaching-imports

export { computeCoreCycles } from './coreCycles'
export { computeSegmentDurationIndices } from './segmentDurationIndices'
export { computeSegmentNoteCounts } from './segmentNoteCounts'
export { computeEntitiesNotes } from './entitiesNotes'
export {
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentNoteCountsWithSegmentDurations,
    computeSegmentNoteCountsFromSegmentRatios,
} from './segmentNoteCounts/indexForTest'
export {
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleTranslation,
    computeLoopCycledSegmentSegments,
    computeSegmentsDimensions,
    SegmentsDimensions,
    LoopSegmentCycleTranslation,
} from './distributeSegmentsToEntities/indexForTest'
export {
    applySmooth,
    BeatenPathEntitiesNotes,
    SmoothNotes,
} from './smooth/indexForTest'
