import { Count, Ratio } from '@musical-patterns/utilities'
import { Durations } from '../types'

interface BuildSegmentsParameters {
    durations: Durations,
    ratios: Ratio[],
    repetitions: Count,
}

export {
    BuildSegmentsParameters,
}
