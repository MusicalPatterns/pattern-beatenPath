// tslint:disable no-reaching-imports

export { computeCoreCycles } from './coreCycles'
export { computeSegmentDurationIndices } from './segmentDurationIndices'
export { computeEntitiesNotes } from './entitiesNotes'
export {
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentPieceLengthsWithSegmentDurations,
    computeSegmentPieceLengthsFromSegmentRatios,
    computeSegmentPieceLengths,
} from './segmentPieceLength/indexForTest'
export {
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleShift,
    computeLoopCycledSegmentSegments,
    computeSegmentsDimensions,
    SegmentsDimensions,
    LoopSegmentCycleShift,
} from './distributeSegmentsToEntities/indexForTest'
export {
    applySmooth,
    BeatenPathEntitiesNotes,
    SmoothNotes,
} from './smooth/indexForTest'
