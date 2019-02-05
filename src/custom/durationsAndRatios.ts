import { absoluteRatio, apply, from, isCloseTo, Ratio, reciprocal, Scalar, to } from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../nominal'
import { Durations, DurationsAndRatios } from '../types'

const buildDurationsAndRatios: (core: Core) => DurationsAndRatios =
    (core: Core): DurationsAndRatios => {
        const durations: Durations = [ to.Scalar(1) ]
        const ratios: Ratio[] = []

        const hasLooped: () => boolean =
            (): boolean =>
                durations.length > 1 &&
                isCloseTo(durations[ durations.length - 1 ], to.Scalar(1))

        const rawCore: number = beatenPathFrom.Core(core)
        const upDivisor: Scalar = to.Scalar(reciprocal(apply.Offset(rawCore, to.Offset(1))))
        const upRatio: Scalar =
            to.Scalar(apply.Scalar(rawCore, upDivisor))
        const downDivisor: Scalar = to.Scalar(reciprocal(apply.Offset(rawCore, to.Offset(-1))))
        const downRatio: Scalar =
            to.Scalar(apply.Scalar(rawCore, downDivisor))

        while (!hasLooped()) {
            const lastDuration: Scalar = durations[ durations.length - 1 ]

            const upDuration: Scalar = apply.Scalar(lastDuration, upRatio)
            const downDuration: Scalar = apply.Scalar(lastDuration, downRatio)

            if (absoluteRatio(from.Scalar(upDuration)) > absoluteRatio(from.Scalar(downDuration))) {
                durations.push(upDuration)
                ratios.push([ to.Numerator(rawCore), to.Denominator(rawCore + 1) ])
            }
            else {
                durations.push(downDuration)
                ratios.push([ to.Numerator(rawCore), to.Denominator(rawCore - 1) ])
            }
        }

        return {
            durations,
            ratios,
        }
    }

export {
    buildDurationsAndRatios,
}
