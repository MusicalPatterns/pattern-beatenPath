// tslint:disable no-magic-numbers

import {
    Cardinal,
    Hz,
    SCIENTIFIC_PITCHES,
    ScientificPitchNoteName,
    ScientificPitchOctaveNumber,
    to,
} from '@musical-patterns/utilities'
import { Core, to as beatenPathTo } from './nominal'
import { BeatenPathStyle } from './types'

const MINIMUM_FUNCTIONAL_CORE: Core = beatenPathTo.Core(2)
const BEATEN_PATH_INITIAL_CORE: Core = beatenPathTo.Core(5)
const BEATEN_PATH_INITIAL_REPETITIONS: Cardinal = to.Cardinal(1)
const BEATEN_PATH_INITIAL_BASE_FREQUENCY: Hz =
    SCIENTIFIC_PITCHES[ ScientificPitchNoteName.A ][ ScientificPitchOctaveNumber._3 ]
const BEATEN_PATH_INITIAL_REVERSE: boolean = false
const BEATEN_PATH_INITIAL_STYLE: BeatenPathStyle = BeatenPathStyle.POLYRHYTHMIC

export {
    MINIMUM_FUNCTIONAL_CORE,
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
}
