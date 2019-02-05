import { apply, from, Index, ONE_HALF, to, TWO } from '@musical-patterns/utilities'

const firstPartDurationIndex: (segmentIndex: Index) => Index =
    (segmentIndex: Index): Index =>
        to.Index(apply.Scalar(
            Math.floor(apply.Scalar(
                from.Index(segmentIndex),
                ONE_HALF,
            )),
            to.Scalar(TWO),
        ))

const secondPartDurationIndex: (segmentIndex: Index) => Index =
    (segmentIndex: Index): Index =>
        to.Index(apply.Offset(
            apply.Scalar(
                Math.ceil(apply.Scalar(
                    from.Index(segmentIndex),
                    ONE_HALF,
                )),
                to.Scalar(TWO),
            ),
            to.Offset(-1),
        ))

export {
    firstPartDurationIndex,
    secondPartDurationIndex,
}
