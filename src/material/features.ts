import { Note, PitchValue, STANDARD_PITCH_SCALE_INDEX, STANDARD_VALUE_SCALE_INDEX } from '@musical-patterns/material'
import { as, ContourElement, Pitch, use, Value } from '@musical-patterns/utilities'
import { ENVELOPE_AMOUNT } from './constants'

const computeNote: (pitchDurationContourElement: ContourElement<PitchValue>) => Note =
    ([ pitch, value ]: ContourElement<PitchValue>): Note => ({
        envelope: {
            scalar: use.Scalar(as.Scalar<Value>(value), ENVELOPE_AMOUNT),
            scaleIndex: STANDARD_VALUE_SCALE_INDEX,
        },
        pitch: {
            scalar: as.Scalar<Pitch>(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        value: {
            scalar: as.Scalar<Value>(value),
            scaleIndex: STANDARD_VALUE_SCALE_INDEX,
        },
    })

export {
    computeNote,
}
