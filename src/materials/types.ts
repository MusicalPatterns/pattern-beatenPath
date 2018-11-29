import { Count } from '@musical-patterns/utilities'
import { Ratio } from '../nominal'
import { Durations } from '../types'

interface BuildSegmentsParameters {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
    repetitions: Count,
}

export {
    BuildSegmentsParameters,
}
