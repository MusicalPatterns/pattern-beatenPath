// tslint:disable no-reaching-imports

export { computeCoreCycles } from './coreCycles'
export { computeSegmentValueIndices } from './segmentValueIndices'
export { computeEntitiesNotes } from './entitiesNotes'
export {
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentPieceLengthsWithSegmentValues,
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
