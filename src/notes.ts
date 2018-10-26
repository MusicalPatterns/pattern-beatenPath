import { applyScale, from, Index, NoteSpec, ONE, Scalar, to } from '../../../src'
import { SUSTAIN_AMOUNT } from './constants'

// tslint:disable-next-line:no-any no-magic-numbers
const DURATIONS_SCALE_INDEX: Index = 1 as any
// tslint:disable-next-line:no-any no-magic-numbers
const PITCH_SCALE_INDEX: Index = 2 as any

const beatenPathNote: (durationScalar: Scalar) => NoteSpec =
    (durationScalar: Scalar): NoteSpec => ({
        durationSpec: {
            scalar: durationScalar,
            scaleIndex: DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            scalar: to.Scalar(ONE / from.Scalar(durationScalar)),
            scaleIndex: PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: applyScale(durationScalar, SUSTAIN_AMOUNT),
            scaleIndex: DURATIONS_SCALE_INDEX,
        },
    })

export {
    beatenPathNote,
}
