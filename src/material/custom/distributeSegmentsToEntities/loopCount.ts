import { as, Cardinal, computeLeastCommonMultiple, notAs, quotient } from '@musical-patterns/utilities'
import { LoopSegmentCycleTranslation, SegmentsDimensions } from './types'

const computeLoopCount: (parameters: SegmentsDimensions) => Cardinal<LoopSegmentCycleTranslation> =
    ({ entityCount, cycleLength }: SegmentsDimensions): Cardinal<LoopSegmentCycleTranslation> =>
        as.Cardinal<LoopSegmentCycleTranslation>(quotient(
            computeLeastCommonMultiple(entityCount, cycleLength),
            notAs.Cardinal(cycleLength),
        ))

export {
    computeLoopCount,
}
