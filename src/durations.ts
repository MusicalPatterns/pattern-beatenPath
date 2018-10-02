import { beatenPathRatios } from './ratios'

const beatenPathDurations: number[] = [1]

// tslint:disable-next-line:prefer-for-of
for (let i: number = 0; i < beatenPathRatios.length - 1; i++) {
    const ratio: number = (beatenPathRatios[i][0] / beatenPathRatios[i][1])
    const previousDuration: number = beatenPathDurations[beatenPathDurations.length - 1]
    beatenPathDurations.push(previousDuration * ratio)
}

export {
    beatenPathDurations,
}
