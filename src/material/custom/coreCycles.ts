import {
    absoluteRatio,
    apply,
    Cycle,
    Denominator,
    DOWN_ONE,
    finalElement,
    Fraction,
    from,
    isCloseTo,
    reciprocal,
    Scalar,
    to,
    UP_ONE,
} from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../../nominals'
import { CoreCycles } from '../types'
import { INITIAL_CORE_DURATION } from './constants'

const isUpwardsDurationCloserToOriginalDurationOfOne:
    (maybeNextUpwardsDuration: Scalar, maybeNextDownwardsDuration: Scalar) => boolean =
    (maybeNextUpwardsDuration: Scalar, maybeNextDownwardsDuration: Scalar): boolean =>
        absoluteRatio(from.Scalar(maybeNextUpwardsDuration)) > absoluteRatio(from.Scalar(maybeNextDownwardsDuration))

const computeCoreCycles: (core: Core) => CoreCycles =
    (core: Core): CoreCycles => {
        const coreDurations: Cycle<Scalar> = to.Cycle([ INITIAL_CORE_DURATION ])
        const coreIntervals: Cycle<Fraction> = to.Cycle([])

        const rawCore: number = beatenPathFrom.Core(core)

        const upwardsDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, UP_ONE)))
        const upwardsDuration: Scalar = to.Scalar(apply.Scalar(rawCore, upwardsDivisor))
        const upwardsDenominator: Denominator = to.Denominator(apply.Translation(rawCore, UP_ONE))
        const upwardsInterval: Fraction = [ to.Numerator(rawCore), upwardsDenominator ]

        const downwardsDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, DOWN_ONE)))
        const downwardsDuration: Scalar = to.Scalar(apply.Scalar(rawCore, downwardsDivisor))
        const downwardsDenominator: Denominator = to.Denominator(apply.Translation(rawCore, DOWN_ONE))
        const downwardsInterval: Fraction = [ to.Numerator(rawCore), downwardsDenominator ]

        let hasLooped: boolean = false
        while (!hasLooped) {
            const previousDuration: Scalar = finalElement(coreDurations)
            const maybeNextUpwardsDuration: Scalar = apply.Scalar(previousDuration, upwardsDuration)
            const maybeNextDownwardsDuration: Scalar = apply.Scalar(previousDuration, downwardsDuration)

            if (isUpwardsDurationCloserToOriginalDurationOfOne(maybeNextUpwardsDuration, maybeNextDownwardsDuration)) {
                if (isCloseTo(maybeNextUpwardsDuration, INITIAL_CORE_DURATION)) {
                    hasLooped = true
                }
                else {
                    coreDurations.push(maybeNextUpwardsDuration)
                }
                coreIntervals.push(upwardsInterval)
            }
            else {
                if (isCloseTo(maybeNextDownwardsDuration, INITIAL_CORE_DURATION)) {
                    hasLooped = true
                }
                else {
                    coreDurations.push(maybeNextDownwardsDuration)
                }
                coreIntervals.push(downwardsInterval)
            }
        }

        return {
            coreDurations,
            coreIntervals,
        }
    }

export {
    computeCoreCycles,
}
