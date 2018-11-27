import { apply, from, Scalar, to } from '@musical-patterns/shared'
import { NoteSpec } from '../../../../compile'
import { DEFAULT_DURATIONS_SCALE_INDEX, DEFAULT_PITCH_SCALE_INDEX } from '../../../../patternMaterial'
import { SUSTAIN_AMOUNT } from '../constants'

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
        sustainSpec: {
            scalar: apply.Scalar(durationScalar, SUSTAIN_AMOUNT),
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
