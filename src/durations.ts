// tslint:disable:no-magic-numbers

import { isCloseTo } from './utilities/isCloseTo'

interface DurationsAndRatios {
    beatenPathDurations: number[],
    beatenPathRatios: number[][],
}

const beatenPathDurationsAndRatiosByCore: (core: number) => DurationsAndRatios =
    (core: number): DurationsAndRatios => {
        const beatenPathDurations: number[] = [1]
        const beatenPathRatios: number[][] = []

        const hasLooped: () => boolean = (): boolean =>
            beatenPathDurations.length > 1 && isCloseTo(beatenPathDurations[beatenPathDurations.length - 1], 1)

        const absoluteRatio: (ratio: number) => number = (ratio: number): number => ratio < 1 ? ratio : 1 / ratio

        const UP_RATIO: number = core / (core + 1)
        const DOWN_RATIO: number = core / (core - 1)

        while (!hasLooped()) {
            const lastDuration: number = beatenPathDurations[beatenPathDurations.length - 1]

            const upDuration: number = lastDuration * UP_RATIO
            const downDuration: number = lastDuration * DOWN_RATIO

            if (absoluteRatio(upDuration) > absoluteRatio(downDuration)) {
                beatenPathDurations.push(upDuration)
                beatenPathRatios.push([core, core + 1])
            } else {
                beatenPathDurations.push(downDuration)
                beatenPathRatios.push([core, core - 1])
            }
        }

        return {
            beatenPathDurations,
            beatenPathRatios,
        }
    }

export {
    beatenPathDurationsAndRatiosByCore,
}
