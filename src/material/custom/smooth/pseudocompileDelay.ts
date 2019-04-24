import { StandardSpec } from '@musical-patterns/spec'
import { as, insteadOf, Ms, notAs, ofNotAs, Scalar, Translation, use } from '@musical-patterns/utilities'
import { PseudocompileDelayParameters } from './types'

const pseudocompileDelay: (parameters: {
    [ StandardSpec.BASE_DURATION ]: Scalar<Ms>,
    [ StandardSpec.BASE_DURATION_TRANSLATION ]: Translation<Ms>,
    delayScalar: Scalar<Ms>,
}) => Translation<Ms> =
    ({ delayScalar, baseDuration, baseDurationTranslation }: PseudocompileDelayParameters): Translation<Ms> =>
        as.Translation<Ms>(notAs.Scalar<Ms>(use.Translation(
            use.Scalar(
                delayScalar,
                as.Scalar(ofNotAs(baseDuration)),
            ),
            insteadOf<Translation, Scalar<Ms>>(baseDurationTranslation),
        )))

export {
    pseudocompileDelay,
}
