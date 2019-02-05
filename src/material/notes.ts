import { NoteSpec } from '@musical-patterns/compiler'
import { STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { apply, from, reciprocal, Scalar, to } from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from './constants'

const buildNoteSpec: (durationScalar: Scalar) => NoteSpec =
    (durationScalar: Scalar): NoteSpec => ({
        durationSpec: {
            scalar: durationScalar,
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            scalar: to.Scalar(reciprocal(from.Scalar(durationScalar))),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: apply.Scalar(durationScalar, SUSTAIN_AMOUNT),
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
