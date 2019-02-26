import {
    absoluteRatio,
    apply,
    Denominator,
    DOWN_ONE,
    Fraction,
    from,
    isCloseTo,
    lastElement,
    reciprocal,
    Scalar,
    to,
    UP_ONE,
} from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../../nominal'
import { FractionsAndScalars } from '../types'

const upwardsIsCloserToOriginalScalarOfOne:
    (maybeNextUpwardsScalar: Scalar, maybeNextDownwardsScalar: Scalar) => boolean =
    (maybeNextUpwardsScalar: Scalar, maybeNextDownwardsScalar: Scalar): boolean =>
        absoluteRatio(from.Scalar(maybeNextUpwardsScalar)) > absoluteRatio(from.Scalar(maybeNextDownwardsScalar))

const buildFractionsAndScalars: (core: Core) => FractionsAndScalars =
    (core: Core): FractionsAndScalars => {
        const scalars: Scalar[] = [ to.Scalar(1) ]
        const fractions: Fraction[] = []

        const hasLooped: () => boolean =
            (): boolean =>
                scalars.length > 1 && isCloseTo(from.Scalar(lastElement(scalars)), 1)

        const rawCore: number = beatenPathFrom.Core(core)

        const upwardsDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, UP_ONE)))
        const upwardsScalar: Scalar = to.Scalar(apply.Scalar(rawCore, upwardsDivisor))
        const upwardsDenominator: Denominator = to.Denominator(apply.Translation(rawCore, UP_ONE))
        const upwardsFraction: Fraction = [ to.Numerator(rawCore), upwardsDenominator ]

        const downwardsDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, DOWN_ONE)))
        const downwardsScalar: Scalar = to.Scalar(apply.Scalar(rawCore, downwardsDivisor))
        const downwardsDenominator: Denominator = to.Denominator(apply.Translation(rawCore, DOWN_ONE))
        const downwardsFraction: Fraction = [ to.Numerator(rawCore), downwardsDenominator ]

        while (!hasLooped()) {
            const lastScalar: Scalar = lastElement(scalars)
            const maybeNextUpwardsScalar: Scalar = apply.Scalar(lastScalar, upwardsScalar)
            const maybeNextDownwardsScalar: Scalar = apply.Scalar(lastScalar, downwardsScalar)

            if (upwardsIsCloserToOriginalScalarOfOne(maybeNextUpwardsScalar, maybeNextDownwardsScalar)) {
                scalars.push(maybeNextUpwardsScalar)
                fractions.push(upwardsFraction)
            }
            else {
                scalars.push(maybeNextDownwardsScalar)
                fractions.push(downwardsFraction)
            }
        }

        return {
            fractions,
            scalars,
        }
    }

export {
    buildFractionsAndScalars,
}
