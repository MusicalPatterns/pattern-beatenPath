import { Cardinal, computeLeastCommonMultiple, quotient } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeLoopCount: (parameters: SegmentsDimensions) => Cardinal =
    ({ entityCount, cycleLength }: SegmentsDimensions): Cardinal =>
        quotient(
            computeLeastCommonMultiple(entityCount, cycleLength),
            cycleLength,
        )

export {
    computeLoopCount,
}
