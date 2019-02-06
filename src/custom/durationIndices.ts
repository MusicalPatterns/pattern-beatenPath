import { apply, from, ONE_HALF, Ordinal, to, TWO } from '@musical-patterns/utilities'

const firstPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        to.Ordinal(apply.Scalar(
            Math.floor(apply.Scalar(
                from.Ordinal(segmentIndex),
                ONE_HALF,
            )),
            to.Scalar(TWO),
        ))

const secondPartDurationIndex: (segmentIndex: Ordinal) => Ordinal =
    (segmentIndex: Ordinal): Ordinal =>
        to.Ordinal(apply.Translation(
            apply.Scalar(
                Math.ceil(apply.Scalar(
                    from.Ordinal(segmentIndex),
                    ONE_HALF,
                )),
                to.Scalar(TWO),
            ),
            to.Translation(-1),
        ))

export {
    firstPartDurationIndex,
    secondPartDurationIndex,
}
