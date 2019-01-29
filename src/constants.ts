// tslint:disable:no-magic-numbers

import { Count, Frequency, Scalar, to } from '@musical-patterns/utilities'
import { Core, to as beatenPathTo } from './nominal'

const MINIMUM_FUNCTIONAL_CORE: Core = beatenPathTo.Core(2)
const BEATEN_PATH_INITIAL_CORE: Core = beatenPathTo.Core(5)
const BEATEN_PATH_INITIAL_REPETITIONS: Count = to.Count(1)
const BEATEN_PATH_INITIAL_BASE_FREQUENCY: Frequency = to.Frequency(220)
const BEATEN_PATH_INITIAL_REVERSE: boolean = false

export {
    MINIMUM_FUNCTIONAL_CORE,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_REVERSE,
}
