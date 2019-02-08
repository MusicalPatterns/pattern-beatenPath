import { apply, Ordinal, Scalar } from '@musical-patterns/utilities'
import { firstPartDurationIndex, secondPartDurationIndex } from './durationIndices'

const calculateDurationScalars: (parameters: { durations: Scalar[], segmentIndex: Ordinal }) => Scalar[] =
    ({ segmentIndex, durations }: { durations: Scalar[], segmentIndex: Ordinal }): Scalar[] => {
        const indexOfFirstPartsDurationForThisSegment: Ordinal = firstPartDurationIndex(segmentIndex)
        const indexOfSecondPartsDurationForThisSegment: Ordinal = secondPartDurationIndex(segmentIndex)
        const firstPartDurationScalar: Scalar =
            apply.Ordinal(durations, indexOfFirstPartsDurationForThisSegment)
        const secondPartDurationScalar: Scalar =
            apply.Ordinal(durations, indexOfSecondPartsDurationForThisSegment)

        return [ firstPartDurationScalar, secondPartDurationScalar ]
    }

export {
    calculateDurationScalars,
}
