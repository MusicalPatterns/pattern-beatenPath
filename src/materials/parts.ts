import { DictionaryOf, sequence } from '@musical-patterns/utilities'
import { PartSpec } from '../../../../compile'
import { Segment } from '../../../../patternMaterial'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { BeatenPathPatternSpec } from '../types'
import { buildSegments } from './segments'

const buildParts: (patternSpec: BeatenPathPatternSpec) => DictionaryOf<PartSpec> =
    ({ core, repetitions }: BeatenPathPatternSpec): DictionaryOf<PartSpec> => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { beatenPathRatios, beatenPathDurations } = buildDurationsAndRatios(clampedCore)
        const beatenPathSegments: Segment[] = buildSegments({ beatenPathDurations, beatenPathRatios, repetitions })

        const beatenPathOnePart: PartSpec = sequence(
            beatenPathSegments.map((segment: Segment): PartSpec => segment[ 0 ]),
        )
        const beatenPathTwoPart: PartSpec = sequence(
            beatenPathSegments.map((segment: Segment): PartSpec => segment[ 1 ]),
        )

        return { beatenPathOnePart, beatenPathTwoPart }
    }

export {
    buildParts,
}
