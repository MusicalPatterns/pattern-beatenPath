import { apply, ceiling, floor, ONE_HALF, Ordinal, Scalar, to, TWO } from '@musical-patterns/utilities'

const firstPartScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Translation(
            apply.Scalar(
                floor(apply.Scalar(segmentIndex, ONE_HALF)),
                to.Scalar(TWO),
            ),
            to.Translation(1),
        )

const secondPartScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Scalar(
            ceiling(apply.Scalar(segmentIndex, ONE_HALF)),
            to.Scalar(TWO),
        )

const calculateScalars: (parameters: { scalars: Scalar[], segmentIndex: Ordinal }) => Scalar[] =
    ({ segmentIndex, scalars }: { scalars: Scalar[], segmentIndex: Ordinal }): Scalar[] => {
        const firstPartScalar: Scalar =
            apply.Ordinal(scalars, firstPartScalarIndex(segmentIndex))
        const secondPartScalar: Scalar =
            apply.Ordinal(scalars, secondPartScalarIndex(segmentIndex))

        return [ firstPartScalar, secondPartScalar ]
    }

export {
    calculateScalars,
    firstPartScalarIndex,
    secondPartScalarIndex,
}
