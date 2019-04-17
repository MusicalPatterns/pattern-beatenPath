import { Segment } from '@musical-patterns/material'
import {
    apply,
    Cardinal,
    Cycle,
    cycleSlice,
    DECREMENT,
    Fraction,
    from,
    insteadOf,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals: (parameters: {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal,
    segmentIndex: Ordinal<Segment>,
}) => Fraction[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Fraction[] =>
        cycleSlice(
            coreIntervals,
            insteadOf<Ordinal, Fraction>(segmentIndex),
            apply.Translation(
                apply.Translation(
                    segmentIndex,
                    to.Translation<Ordinal<Segment>>(from.Cardinal(entityCount)),
                ),
                DECREMENT,
            ),
        )

export {
    computeSegmentIntervals,
}
