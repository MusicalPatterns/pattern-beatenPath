import { NoteSpec } from '@musical-patterns/compiler'
import { DEFAULT_DURATIONS_SCALE_INDEX, DEFAULT_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { from, Scalar, to } from '@musical-patterns/utilities'

const buildNoteSpec: (durationScalar: Scalar) => NoteSpec =
    (durationScalar: Scalar): NoteSpec => ({
        durationSpec: {
            scalar: durationScalar,
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            scalar: to.Scalar(1 / from.Scalar(durationScalar)),
            scaleIndex: DEFAULT_PITCH_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}