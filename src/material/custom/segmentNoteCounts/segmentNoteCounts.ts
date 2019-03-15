import { Cardinal, Fraction } from '@musical-patterns/utilities'
import { alignSegmentNoteCountsWithSegmentDurations } from './alignSegmentNoteCountsWithSegmentDurations'
import { computeSegmentIntervals } from './segmentIntervals'
import { computeSegmentNoteCountsFromSegmentRatios } from './segmentNoteCountsFromSegmentRatios'
import { computeSegmentRatios } from './segmentRatios'
import { ComputeSegmentNoteCountsParameters } from './types'

const computeSegmentNoteCounts: (parameters: ComputeSegmentNoteCountsParameters) => Cardinal[] =
    (computeSegmentNoteCountsParameters: ComputeSegmentNoteCountsParameters): Cardinal[] => {
        const { segmentDurationIndices, segmentIndex, coreIntervals, entityCount } = computeSegmentNoteCountsParameters

        const segmentIntervals: Fraction[] = computeSegmentIntervals({ segmentIndex, coreIntervals, entityCount })
        const segmentRatios: Fraction[] = computeSegmentRatios({ segmentIntervals })

        const segmentNoteCountsFromSegmentRatios: Cardinal[] =
            computeSegmentNoteCountsFromSegmentRatios(segmentRatios)

        return alignSegmentNoteCountsWithSegmentDurations({
            segmentDurationIndices,
            segmentNoteCounts: segmentNoteCountsFromSegmentRatios,
        })
    }

export {
    computeSegmentNoteCounts,
}
