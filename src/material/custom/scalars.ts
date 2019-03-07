import {
    apply,
    ceiling,
    floor,
    ONE_HALF,
    Ordinal,
    Scalar,
    to,
    TWO,
} from '@musical-patterns/utilities'

const calculateFirstPartScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Translation(
            apply.Scalar(
                floor(apply.Scalar(segmentIndex, ONE_HALF)),
                to.Scalar(TWO),
            ),
            to.Translation(1),
        )

const calculateSecondPartScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Scalar(
            ceiling(apply.Scalar(segmentIndex, ONE_HALF)),
            to.Scalar(TWO),
        )

const selectScalarsForSegment: (parameters: { scalars: Scalar[], segmentIndex: Ordinal }) => Scalar[] =
    ({ segmentIndex, scalars }: { scalars: Scalar[], segmentIndex: Ordinal }): Scalar[] => {
        const firstPartScalar: Scalar =
            apply.Ordinal(scalars, calculateFirstPartScalarIndex(segmentIndex))
        const secondPartScalar: Scalar =
            apply.Ordinal(scalars, calculateSecondPartScalarIndex(segmentIndex))

        return [ firstPartScalar, secondPartScalar ]
    }

export {
    selectScalarsForSegment,
    calculateFirstPartScalarIndex,
    calculateSecondPartScalarIndex,
}
