// tslint:disable:no-magic-numbers

import { Count, Scalar, to } from '../../../src'
import { Core, to as beatenPathTo } from './nominal'

const SUSTAIN_AMOUNT: Scalar = to.Scalar(0.9)
const MINIMUM_FUNCTIONAL_CORE: Core = beatenPathTo.Core(2)
const BEATEN_PATH_INITIAL_CORE: Core = beatenPathTo.Core(5)
const BEATEN_PATH_INITIAL_REPETITIONS: Count = to.Count(1)
const BEATEN_PATH_PITCH_SCALAR: Scalar = to.Scalar(220)

export {
    SUSTAIN_AMOUNT,
    MINIMUM_FUNCTIONAL_CORE,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_PITCH_SCALAR,
}
