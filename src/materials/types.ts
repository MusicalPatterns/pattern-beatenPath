import { Count } from '@musical-patterns/utilities'
import { Ratio } from '../nominal'
import { Durations } from '../types'

interface BuildSegmentsParameters {
    durations: Durations,
    ratios: Ratio[],
    repetitions: Count,
}

export {
    BuildSegmentsParameters,
}
