// tslint:disable no-reaching-imports

export { material } from './materials'
export { computeSegments } from './segments'
export { materializeEntities } from './entities'
export { computeNote } from './features'
export { computeNotes } from './notes'
export { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
export {
    computeCoreCycles,
    computeSegmentValueIndices,
    computeSegmentPieceLengths,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentPieceLengthsWithSegmentValues,
    computeSegmentPieceLengthsFromSegmentRatios,
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleShift,
    computeLoopCycledSegmentSegments,
    computeSegmentsDimensions,
    SegmentsDimensions,
    computeEntitiesNotes,
    BeatenPathEntitiesNotes,
    applySmooth,
    SmoothNotes,
    LoopSegmentCycleShift,
} from './custom/indexForTest'

export {
    CoreCycles,
} from './types'
