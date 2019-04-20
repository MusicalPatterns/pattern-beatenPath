import { Entity, Segment } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    Cycle,
    cycleSlice,
    DECREMENT,
    Fraction,
    insteadOf,
    notAs,
    Ordinal,
    use,
} from '@musical-patterns/utilities'
import { ComputeSegmentIntervalsParameters } from './types'

const computeSegmentIntervals: (parameters: {
    coreIntervals: Cycle<Fraction>,
    entityCount: Cardinal<Entity>,
    segmentIndex: Ordinal<Segment>,
}) => Fraction[] =
    ({ entityCount, segmentIndex, coreIntervals }: ComputeSegmentIntervalsParameters): Fraction[] =>
        cycleSlice(
            coreIntervals,
            insteadOf<Ordinal, Fraction>(segmentIndex),
            use.Translation(
                use.Translation(
                    segmentIndex,
                    as.Translation<Ordinal<Segment>>(notAs.Cardinal<Entity>(entityCount)),
                ),
                DECREMENT,
            ),
        )

export {
    computeSegmentIntervals,
}
