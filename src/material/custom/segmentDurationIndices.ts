import { Segment } from '@musical-patterns/material'
import {
    apply,
    Cardinal,
    finalIndexFromElementsTotal,
    floor,
    from,
    INCREMENT,
    INITIAL,
    insteadOf,
    negative,
    ofFrom,
    Ordinal,
    Scalar,
    to,
    Translation,
} from '@musical-patterns/utilities'
import { ComputeSegmentDurationIndicesParameters } from './types'

const computeSegmentDurationIndices: (parameters: {
    entityCount: Cardinal,
    segmentIndex: Ordinal<Segment>,
}) => Array<Ordinal<Scalar>> =
    ({ segmentIndex, entityCount }: ComputeSegmentDurationIndicesParameters): Array<Ordinal<Scalar>> => {
        const segmentDurationIndices: Array<Ordinal<Scalar>> = []

        for (
            let entityIndex: Ordinal<Scalar> = INITIAL;
            entityIndex <= insteadOf<Ordinal, Scalar>(finalIndexFromElementsTotal(entityCount));
            entityIndex = apply.Translation(entityIndex, INCREMENT)
        ) {
            const initialEntityDurationIndex: Ordinal<Scalar> = apply.Translation(
                insteadOf<Ordinal, Scalar>(finalIndexFromElementsTotal(entityCount)),
                to.Translation(ofFrom(negative(entityIndex))),
            )
            const entityCoreCycleProgressBeforeStepping: Ordinal<Segment> = apply.Translation(
                segmentIndex,
                to.Translation(ofFrom(insteadOf<Ordinal, Segment>(entityIndex))),
            )
            const entityCoreCycleProgressAfterStepping: Translation<Ordinal<Scalar>> =
                to.Translation<Ordinal<Scalar>>(apply.Scalar(
                    floor(from.Ordinal<Segment>(entityCoreCycleProgressBeforeStepping) / from.Cardinal(entityCount)),
                    to.Scalar(from.Cardinal(entityCount)),
                ))

            segmentDurationIndices.push(apply.Translation(
                initialEntityDurationIndex,
                entityCoreCycleProgressAfterStepping,
            ))
        }

        return segmentDurationIndices
    }

export {
    computeSegmentDurationIndices,
}
