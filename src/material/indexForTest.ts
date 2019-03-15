// tslint:disable no-reaching-imports

export { material } from './materials'
export { computeSegments } from './segments'
export { materializeEntities } from './entities'
export { computeEntitiesNotes } from './notes'
export { computeNote } from './features'
export { computePolyrhythmicPiece, computeSmoothPiece } from './pieces'
export {
    computeCoreCycles,
    computeSegmentDurationIndices,
    computeSegmentNoteCounts,
    computeSegmentRatios,
    computeSegmentIntervals,
    alignSegmentNoteCountsWithSegmentDurations,
    computeSegmentNoteCountsFromSegmentRatios,
    computeEntitiesNotesFromSegments,
    computeLoopCount,
    computeLoopSegmentCycleTranslations,
    computeLoopCycledSegmentSegments,
    computeSegmentsDimensions,
    SegmentsDimensions,
} from './custom/indexForTest'

export {
    CoreCycles,
} from './types'
