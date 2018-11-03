import { DictionaryOf, Part, Segment, sequence } from '../../../../src'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { buildSegments } from './segments'

const buildParts: (core: Core) => DictionaryOf<Part> =
    (core: Core): DictionaryOf<Part> => {
        const clampeedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { beatenPathRatios, beatenPathDurations } = buildDurationsAndRatios(clampeedCore)
        const beatenPathSegments: Segment[] = buildSegments(beatenPathDurations, beatenPathRatios)

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
