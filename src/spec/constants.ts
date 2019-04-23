// tslint:disable no-magic-numbers

import { Entity } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    Hz,
    Ms,
    ofNotAs,
    Scalar,
    SCIENTIFIC_PITCHES,
    ScientificPitchNoteName,
    ScientificPitchOctaveNumber,
} from '@musical-patterns/utilities'
import { as as beatenPathTo, Core, Repetition } from '../nominals'
import { BeatenPathStyle } from './types'

const BEATEN_PATH_INITIAL_CORE: Core = beatenPathTo.Core(5)
const BEATEN_PATH_INITIAL_REPETITIONS: Cardinal<Repetition[]> = as.Cardinal<Repetition[]>(1)
const BEATEN_PATH_INITIAL_BASE_FREQUENCY: Scalar<Hz> =
    as.Scalar(ofNotAs(SCIENTIFIC_PITCHES[ ScientificPitchNoteName.A ][ ScientificPitchOctaveNumber._3 ]))
const BEATEN_PATH_INITIAL_REVERSE: boolean = false
const BEATEN_PATH_INITIAL_STYLE: BeatenPathStyle = BeatenPathStyle.POLYRHYTHMIC
const BEATEN_PATH_INITIAL_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(2)

const BEATEN_PATH_MINIMUM_FUNCTIONAL_CORE: Core = beatenPathTo.Core(2)

const PRESET_BALANCED_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(500)
const PRESET_BALANCED_CORE: Core = beatenPathTo.Core(3)
const PRESET_BALANCED_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)

const PRESET_DENSE_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(369)
const PRESET_DENSE_CORE: Core = beatenPathTo.Core(2)
const PRESET_DENSE_BASE_FREQUENCY: Scalar<Hz> =
    as.Scalar(ofNotAs(SCIENTIFIC_PITCHES[ ScientificPitchNoteName.B ][ ScientificPitchOctaveNumber._3 ]))
const PRESET_DENSE_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(4)
const PRESET_DENSE_REPETITIONS: Cardinal<Repetition[]> = as.Cardinal<Repetition[]>(4)

const PRESET_PRIMAL_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(3)
const PRESET_PRIMAL_BASE_FREQUENCY: Scalar<Hz> =
    as.Scalar(ofNotAs(SCIENTIFIC_PITCHES[ ScientificPitchNoteName.A ][ ScientificPitchOctaveNumber._4 ]))
const PRESET_PRIMAL_CORE: Core = beatenPathTo.Core(12)
const PRESET_PRIMAL_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)

const PRESET_ROUND_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(20)
const PRESET_ROUND_BASE_FREQUENCY: Scalar<Hz> =
    as.Scalar(ofNotAs(SCIENTIFIC_PITCHES[ ScientificPitchNoteName.C_SHARP_D_FLAT ][ ScientificPitchOctaveNumber._4 ]))
const PRESET_ROUND_CORE: Core = beatenPathTo.Core(2)
const PRESET_ROUND_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(7)

const PRESET_ISOLATE_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(180)
const PRESET_ISOLATE_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(1)
const PRESET_ISOLATE_CORE: Core = beatenPathTo.Core(3)

const PRESET_ANVIL_BASE_DURATION: Scalar<Ms> = as.Scalar<Ms>(400)
const PRESET_ANVIL_CORE: Core = beatenPathTo.Core(4)
const PRESET_ANVIL_ENTITY_COUNT: Cardinal<Entity[]> = as.Cardinal<Entity[]>(6)

export {
    BEATEN_PATH_INITIAL_CORE,
    BEATEN_PATH_INITIAL_REPETITIONS,
    BEATEN_PATH_INITIAL_BASE_FREQUENCY,
    BEATEN_PATH_INITIAL_REVERSE,
    BEATEN_PATH_INITIAL_STYLE,
    BEATEN_PATH_INITIAL_ENTITY_COUNT,
    BEATEN_PATH_MINIMUM_FUNCTIONAL_CORE,
    PRESET_BALANCED_BASE_DURATION,
    PRESET_BALANCED_CORE,
    PRESET_BALANCED_ENTITY_COUNT,
    PRESET_DENSE_BASE_DURATION,
    PRESET_DENSE_CORE,
    PRESET_DENSE_BASE_FREQUENCY,
    PRESET_DENSE_ENTITY_COUNT,
    PRESET_DENSE_REPETITIONS,
    PRESET_PRIMAL_BASE_DURATION,
    PRESET_PRIMAL_BASE_FREQUENCY,
    PRESET_PRIMAL_CORE,
    PRESET_PRIMAL_ENTITY_COUNT,
    PRESET_ROUND_BASE_DURATION,
    PRESET_ROUND_BASE_FREQUENCY,
    PRESET_ROUND_CORE,
    PRESET_ROUND_ENTITY_COUNT,
    PRESET_ISOLATE_BASE_DURATION,
    PRESET_ISOLATE_CORE,
    PRESET_ISOLATE_ENTITY_COUNT,
    PRESET_ANVIL_BASE_DURATION,
    PRESET_ANVIL_CORE,
    PRESET_ANVIL_ENTITY_COUNT,
}
