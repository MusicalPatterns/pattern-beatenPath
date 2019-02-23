import { apply, ceiling, floor, ONE_HALF, Ordinal, to, TWO } from '@musical-patterns/utilities'

const firstPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Translation(
            apply.Scalar(
                floor(apply.Scalar(segmentIndex, ONE_HALF)),
                to.Scalar(TWO),
            ),
            to.Translation(1),
        )

const secondPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        apply.Scalar(
            ceiling(apply.Scalar(segmentIndex, ONE_HALF)),
            to.Scalar(TWO),
        )

export {
    firstPartDurationIndex,
    secondPartDurationIndex,
}
