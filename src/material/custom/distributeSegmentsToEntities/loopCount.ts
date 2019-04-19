import { Cardinal, computeLeastCommonMultiple, from, quotient, to } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopCount: (parameters: SegmentsDimensions) => Cardinal<LoopSegmentCycleTranslation> =
    ({ entityCount, cycleLength }: SegmentsDimensions): Cardinal<LoopSegmentCycleTranslation> =>
        to.Cardinal<LoopSegmentCycleTranslation>(quotient(
            computeLeastCommonMultiple(entityCount, cycleLength),
            from.Cardinal(cycleLength),
        ))

export {
    computeLoopCount,
}
