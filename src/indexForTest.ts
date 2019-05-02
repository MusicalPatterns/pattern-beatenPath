// tslint:disable no-reaching-imports

export {
    computeSegments,
    materializeEntities,
    computeEntitiesNotes,
    computeCoreCycles,
    computeSegmentValueIndices,
    CoreCycles,
    computeSegmentPieceLengths,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentPieceLengthsWithSegmentValues,
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

export { beatenPathAs, Core, Repetition } from './nominals'
export {
    PieceLength,
} from './types'
