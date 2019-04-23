import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, cycleSlice, DECREMENT, Fraction, insteadOf, Ordinal, use } from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals: (parameters: {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}) => Fraction[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Fraction[] =>
        cycleSlice(
            coreIntervals,
            insteadOf<Ordinal, Cycle<Fraction>>(segmentIndex),
            use.Cardinal(
                use.Cardinal(
                    segmentIndex,
                    insteadOf<Cardinal, Ordinal<Segment[]>>(entityCount),
                ),
                DECREMENT,
            ),
        )

export {
    computeSegmentIntervals,
}
