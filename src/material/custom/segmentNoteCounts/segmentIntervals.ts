import { apply, Cardinal, Cycle, cycleSlice, Fraction, Ordinal, PREVIOUS } from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals:
    (parameters: { coreIntervals: Cycle<Fraction>, entityCount: Cardinal, segmentIndex: Ordinal }) => Fraction[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Fraction[] =>
        cycleSlice(
            coreIntervals,
            segmentIndex,
            apply.Translation(apply.Translation(segmentIndex, entityCount), PREVIOUS),
        )

export {
    computeSegmentIntervals,
}
