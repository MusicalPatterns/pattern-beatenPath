import { StandardSpec } from '@musical-patterns/spec'
import { apply, from, insteadOf, Ms, ofFrom, Scalar, to, Translation } from '@musical-patterns/utilities'
import { PseudocompileDelayParameters } from './types'

const pseudocompileDelay: (parameters: {
    [ StandardSpec.BASE_DURATION ]: Scalar<Ms>,
    [ StandardSpec.BASE_DURATION_TRANSLATION ]: Translation<Ms>,
    delayScalar: Scalar<Ms>,
}) => Ms =
    ({ delayScalar, baseDuration, baseDurationTranslation }: PseudocompileDelayParameters): Ms =>
        to.Ms(from.Scalar(apply.Translation(
            apply.Scalar(
                delayScalar,
                to.Scalar(ofFrom(baseDuration)),
            ),
            insteadOf<Translation, Scalar<Ms>>(baseDurationTranslation),
        )))

export {
    pseudocompileDelay,
}
