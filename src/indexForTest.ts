// tslint:disable no-reaching-imports

export {
    computeSegments,
    materializeEntities,
    computeEntitiesNotes,
    computeCoreCycles,
    computeSegmentDurationIndices,
    CoreCycles,
    computeSegmentPieceLengths,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentPieceLengthsWithSegmentDurations,
    computeSegmentPieceLengthsFromSegmentRatios,
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleShift,
    computeLoopCycledSegmentSegments,
    material,
    computeSegmentsDimensions,
    SegmentsDimensions,
    computePolyrhythmicPiece,
    computeSmoothPiece,
    computeNote,
    computeNotes,
    BeatenPathEntitiesNotes,
    applySmooth,
    SmoothNotes,
    LoopSegmentCycleShift,
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpecs,
    BeatenPathStyle,
    spec,
} from './spec/indexForTest'

export { as, notAs, Core, Repetition } from './nominals'
export {
    PieceLength,
} from './types'
