import { apply, ceiling, floor, negative, ONE_HALF, Ordinal, to, TWO } from '@musical-patterns/utilities'

const firstPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Scalar(
            floor(apply.Scalar(segmentIndex, ONE_HALF)),
            to.Scalar(TWO),
        )

const secondPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Translation(
            apply.Scalar(
                ceiling(apply.Scalar(segmentIndex, ONE_HALF)),
                to.Scalar(TWO),
            ),
            to.Translation(negative(1)),
        )

export {
    firstPartDurationIndex,
    secondPartDurationIndex,
}
