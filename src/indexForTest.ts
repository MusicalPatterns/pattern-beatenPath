// tslint:disable no-reaching-imports

export {
    computeSegments,
    materializeEntities,
    computeEntitiesNotes,
    computeCoreCycles,
    computeSegmentDurationIndices,
    CoreCycles,
    computeSegmentNoteCounts,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentNoteCountsWithSegmentDurations,
    computeSegmentNoteCountsFromSegmentRatios,
    distributeSegmentsToEntities,
    computeLoopCount,
    computeLoopSegmentCycleTranslations,
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
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpecs,
    BeatenPathStyle,
    spec,
} from './spec/indexForTest'

export { to, from, Core } from './nominals'
