import { NoteSpec } from '@musical-patterns/compiler'
import { PitchDuration, STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { apply, ContourElement, to } from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from './constants'

const buildNoteSpec: (pitchDurationContourElement: ContourElement<PitchDuration>) => NoteSpec =
    ([ pitch, duration ]: ContourElement<PitchDuration>): NoteSpec => ({
        durationSpec: {
            scalar: to.Scalar(duration),
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            scalar: to.Scalar(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: apply.Scalar(to.Scalar(duration), SUSTAIN_AMOUNT),
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
