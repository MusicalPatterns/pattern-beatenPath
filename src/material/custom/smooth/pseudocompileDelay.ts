import { apply, from, Ms, to } from '@musical-patterns/utilities'
import { PseudocompileDelayParameters } from './types'

const pseudocompileDelay: (parameters: PseudocompileDelayParameters) => Ms =
    ({ delayScalar, baseDuration, baseDurationTranslation }: PseudocompileDelayParameters): Ms =>
        to.Ms(from.Scalar(apply.Translation(
            apply.Scalar(
                delayScalar,
                baseDuration,
            ),
            baseDurationTranslation,
        )))

export {
    pseudocompileDelay,
}
