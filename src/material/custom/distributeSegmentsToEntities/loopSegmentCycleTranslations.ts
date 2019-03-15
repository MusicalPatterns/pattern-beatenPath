import { apply, from, negative, to, Translation } from '@musical-patterns/utilities'
import { SegmentsDimensions } from './types'

const computeLoopSegmentCycleTranslations:
    (parameters: SegmentsDimensions) => Translation =
    ({ cycleLength, entityCount }: SegmentsDimensions): Translation =>
        to.Translation(from.Cardinal(negative(apply.Modulus(
            cycleLength,
            to.Modulus(from.Cardinal(entityCount)),
        ))))

export {
    computeLoopSegmentCycleTranslations,
}
