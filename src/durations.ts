// tslint:disable:no-magic-numbers

import { isCloseTo } from './utilities/isCloseTo'

const beatenPathDurations: number[] = [1]
const beatenPathRatios: number[][] = []

const hasLooped: () => boolean = (): boolean =>
    beatenPathDurations.length > 1 && isCloseTo(beatenPathDurations[beatenPathDurations.length - 1], 1)

const absoluteRatio: (ratio: number) => number = (ratio: number): number => ratio < 1 ? ratio : 1 / ratio

const UP_RATIO: number = 5 / 6
const DOWN_RATIO: number = 5 / 4

while (!hasLooped()) {
    const lastDuration: number = beatenPathDurations[beatenPathDurations.length - 1]

    const upDuration: number = lastDuration * UP_RATIO
    const downDuration: number = lastDuration * DOWN_RATIO

    if (absoluteRatio(upDuration) > absoluteRatio(downDuration)) {
        beatenPathDurations.push(upDuration)
        beatenPathRatios.push([5, 6])
    } else {
        beatenPathDurations.push(downDuration)
        beatenPathRatios.push([5, 4])
    }
}

export {
    beatenPathDurations,
    beatenPathRatios,
}
