import { Fraction, lastElement, multiplyFractions } from '@musical-patterns/utilities'
import { INITIAL_RATIO_FOR_COMPUTE_SEGMENT_RATIOS } from './constants'
import { ComputeSegmentRatiosParameters } from './types'

const computeSegmentRatios: (parameters: ComputeSegmentRatiosParameters) => Fraction[] =
    ({ segmentIntervals }: ComputeSegmentRatiosParameters): Fraction[] => {
        const segmentRatios: Fraction[] = [ INITIAL_RATIO_FOR_COMPUTE_SEGMENT_RATIOS ]

        segmentIntervals.forEach((segmentInterval: Fraction) => {
            const nextSegmentRatio: Fraction = multiplyFractions(lastElement(segmentRatios), segmentInterval)
            segmentRatios.push(nextSegmentRatio)
        })

        return segmentRatios
    }

export {
    computeSegmentRatios,
}
