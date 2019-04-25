import {
    Note,
    PitchDuration,
    STANDARD_DURATION_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { as, ContourElement, Duration, Pitch, use } from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from './constants'

const computeNote: (pitchDurationContourElement: ContourElement<PitchDuration>) => Note =
    ([ pitch, duration ]: ContourElement<PitchDuration>): Note => ({
        duration: {
            scalar: as.Scalar<Duration>(duration),
            scaleIndex: STANDARD_DURATION_SCALE_INDEX,
        },
        pitch: {
            scalar: as.Scalar<Pitch>(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        sustain: {
            scalar: use.Scalar(as.Scalar<Duration>(duration), SUSTAIN_AMOUNT),
            scaleIndex: STANDARD_DURATION_SCALE_INDEX,
        },
    })

export {
    computeNote,
}
