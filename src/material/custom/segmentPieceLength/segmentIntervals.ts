import { Entity, Segment } from '@musical-patterns/material'
import { Cardinal, Cycle, cycleSlice, DECREMENT, insteadOf, Ordinal, Rational, use } from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals: (parameters: {
    coreIntervals: Cycle<Rational>,
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}) => Rational[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Rational[] =>
        cycleSlice(
            coreIntervals,
            insteadOf<Ordinal, Cycle<Rational>>(segmentIndex),
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
