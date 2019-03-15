import { Cardinal, Cycle, Fraction, Ordinal } from '@musical-patterns/utilities'

interface ComputeSegmentNoteCountsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal,
    segmentDurationIndices: Ordinal[],
    segmentIndex: Ordinal,
}

interface ComputeSegmentIntervalsParameters {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal,
    segmentIndex: Ordinal,
}

interface ComputeSegmentRatiosParameters {
    segmentIntervals: Fraction[]
}

interface AlignSegmentNoteCountsWithSegmentDurationsParameters {
    segmentDurationIndices: Ordinal[],
    segmentNoteCounts: Cardinal[],
}

export {
    ComputeSegmentNoteCountsParameters,
    ComputeSegmentIntervalsParameters,
    ComputeSegmentRatiosParameters,
    AlignSegmentNoteCountsWithSegmentDurationsParameters,
}
