import { as, Cardinal, computeLeastCommonMultiple,  quotient } from '@musical-patterns/utilities'
import { LoopSegmentCycleShift, SegmentsDimensions } from './types'

const computeLoopCount: (parameters: SegmentsDimensions) => Cardinal<LoopSegmentCycleShift> =
    ({ entityCount, cycleLength }: SegmentsDimensions): Cardinal<LoopSegmentCycleShift> =>
        as.Cardinal<LoopSegmentCycleShift>(quotient(
            computeLeastCommonMultiple(entityCount, cycleLength),
            as.number(cycleLength),
        ))

export {
    computeLoopCount,
}
