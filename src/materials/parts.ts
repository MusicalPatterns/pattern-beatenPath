import { DictionaryOf, Part, Segment, sequence } from '../../../../src'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { BeatenPathPatternSpec } from '../types'
import { buildSegments } from './segments'

const buildParts: (patternSpec: BeatenPathPatternSpec) => DictionaryOf<Part> =
    ({ core, repetitions }: BeatenPathPatternSpec): DictionaryOf<Part> => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { beatenPathRatios, beatenPathDurations } = buildDurationsAndRatios(clampedCore)
        const beatenPathSegments: Segment[] = buildSegments({ beatenPathDurations, beatenPathRatios, repetitions })

        const beatenPathOnePart: Part = sequence(
            beatenPathSegments.map((segment: Segment): Part => segment[ 0 ]),
        )
        const beatenPathTwoPart: Part = sequence(
            beatenPathSegments.map((segment: Segment): Part => segment[ 1 ]),
        )

        return { beatenPathOnePart, beatenPathTwoPart }
    }

export {
    buildParts,
}
