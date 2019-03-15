import { apply, cycleSlice, Fraction, PREVIOUS } from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals: (parameters: ComputeSegmentIntervalsParameters) => Fraction[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Fraction[] =>
        cycleSlice(
            coreIntervals,
            segmentIndex,
            apply.Translation(apply.Translation(segmentIndex, entityCount), PREVIOUS),
        )

export {
    computeSegmentIntervals,
}
