import { Cardinal, Ratio } from '@musical-patterns/utilities'
import { Durations } from '../types'

interface BuildSegmentsParameters {
    durations: Durations,
    ratios: Ratio[],
    repetitions: Cardinal,
}

export {
    BuildSegmentsParameters,
}
