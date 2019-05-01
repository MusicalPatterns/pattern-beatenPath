import { Note, PitchValue } from '@musical-patterns/material'
import { as, ContourElement, Pitch, use, Value } from '@musical-patterns/utilities'
import { ENVELOPE_AMOUNT } from './constants'

const computeNote: (pitchDurationContourElement: ContourElement<PitchValue>) => Note =
    ([ pitch, value ]: ContourElement<PitchValue>): Note => ({
        envelope: {
            scalar: use.Scalar(as.Scalar<Value>(value), ENVELOPE_AMOUNT),
        },
        pitch: {
            scalar: as.Scalar<Pitch>(pitch),
        },
        value: {
            scalar: as.Scalar<Value>(value),
        },
    })

export {
    computeNote,
}
