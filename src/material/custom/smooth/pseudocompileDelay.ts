import { StandardSpec } from '@musical-patterns/spec'
import { Duration, Scalar, Translation, use } from '@musical-patterns/utilities'
import { PseudocompileDelayParameters } from './types'

const pseudocompileDelay: (parameters: {
    [ StandardSpec.MS_PHYSICALIZATION ]: Duration,
    [ StandardSpec.MS_PHYSICALIZATION_TRANSLATION ]: Translation<Duration>,
    delayScalar: Scalar<Duration>,
}) => Duration =
    ({ delayScalar, msPhysicalization, msPhysicalizationTranslation }: PseudocompileDelayParameters): Duration =>
        use.Translation(
            use.Scalar(
                msPhysicalization,
                delayScalar,
            ),
            msPhysicalizationTranslation,
        )

export {
    pseudocompileDelay,
}
