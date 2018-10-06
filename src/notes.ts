import { ONE } from '../../../src/constants'
import { Note } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Time } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { SUSTAIN_AMOUNT } from './constants'

const beatenPathNote: (duration: Time) => Note =
    (duration: Time): Note => ({
        duration,
        gain: to.Scalar(ONE),
        pitchIndex: to.Index(ONE),
        pitchScalar: to.Scalar(ONE / from.Time(duration)),
        scaleIndex: to.Index(0),
        sustain: scale(duration, SUSTAIN_AMOUNT),
    })

export {
    beatenPathNote,
}
