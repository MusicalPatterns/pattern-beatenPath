import {
    Note,
    PitchDuration,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { apply, ContourElement, Scalar, to } from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from './constants'

const computeNote: (pitchDurationContourElement: ContourElement<PitchDuration>) => Note =
    ([ pitch, duration ]: ContourElement<PitchDuration>): Note => ({
        duration: {
            scalar: to.Scalar<Scalar>(duration),
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        pitch: {
            scalar: to.Scalar<Scalar>(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        sustain: {
            scalar: apply.Scalar(to.Scalar<Scalar>(duration), SUSTAIN_AMOUNT),
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
    })

export {
    computeNote,
}
