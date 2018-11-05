import { Count } from '../../../../src'
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
