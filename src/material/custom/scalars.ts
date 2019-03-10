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

const calculateFirstEntityScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Translation(
            apply.Scalar(
                floor(apply.Scalar(segmentIndex, ONE_HALF)),
                to.Scalar(TWO),
            ),
            to.Translation(1),
        )

const calculateSecondEntityScalarIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Scalar(
            ceiling(apply.Scalar(segmentIndex, ONE_HALF)),
            to.Scalar(TWO),
        )

const selectScalarsForSegment: (parameters: { scalars: Scalar[], segmentIndex: Ordinal }) => Scalar[] =
    ({ segmentIndex, scalars }: { scalars: Scalar[], segmentIndex: Ordinal }): Scalar[] => {
        const firstEntityScalar: Scalar =
            apply.Ordinal(scalars, calculateFirstEntityScalarIndex(segmentIndex))
        const secondEntityScalar: Scalar =
            apply.Ordinal(scalars, calculateSecondEntityScalarIndex(segmentIndex))

        return [ firstEntityScalar, secondEntityScalar ]
    }

export {
    selectScalarsForSegment,
    calculateFirstEntityScalarIndex,
    calculateSecondEntityScalarIndex,
}
