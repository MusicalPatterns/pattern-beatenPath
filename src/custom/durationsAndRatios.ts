import { absoluteRatio, apply, from, isCloseTo, Scalar, to } from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom, Ratio, to as beatenPathTo } from '../nominal'
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
        const upRatio: Scalar = to.Scalar(rawCore / (rawCore + 1))
        const downRatio: Scalar = to.Scalar(rawCore / (rawCore - 1))

        while (!hasLooped()) {
            const lastDuration: Scalar = durations[ durations.length - 1 ]

            const upDuration: Scalar = apply.Scalar(lastDuration, upRatio)
            const downDuration: Scalar = apply.Scalar(lastDuration, downRatio)

            if (absoluteRatio(from.Scalar(upDuration)) > absoluteRatio(from.Scalar(downDuration))) {
                durations.push(upDuration)
                ratios.push([ beatenPathTo.Numerator(rawCore), beatenPathTo.Denominator(rawCore + 1) ])
            }
            else {
                durations.push(downDuration)
                ratios.push([ beatenPathTo.Numerator(rawCore), beatenPathTo.Denominator(rawCore - 1) ])
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
