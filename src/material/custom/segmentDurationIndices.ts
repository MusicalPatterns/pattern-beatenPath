import { Entity, Segment } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    finalIndexFromElementsTotal,
    floor,
    INCREMENT,
    INITIAL,
    insteadOf,
    negative,
    notAs,
    ofNotAs,
    Ordinal,
    Scalar,
    Transition,
    use,
} from '@musical-patterns/utilities'
import { ComputeSegmentDurationIndicesParameters } from './types'

const computeSegmentDurationIndices: (parameters: {
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}) => Array<Ordinal<Scalar[]>> =
    ({ segmentIndex, entityCount }: ComputeSegmentDurationIndicesParameters): Array<Ordinal<Scalar[]>> => {
        const segmentDurationIndices: Array<Ordinal<Scalar[]>> = []

        for (
            let entityDurationIndex: Ordinal<Scalar[]> = INITIAL;
            entityDurationIndex <= insteadOf<Ordinal, Scalar[]>(finalIndexFromElementsTotal(entityCount));
            entityDurationIndex = use.Cardinal(entityDurationIndex, INCREMENT)
        ) {
            const initialEntityDurationIndex: Ordinal<Scalar[]> = use.Cardinal(
                insteadOf<Ordinal, Scalar[]>(finalIndexFromElementsTotal(entityCount)),
                as.Cardinal(ofNotAs(negative(entityDurationIndex))),
            )
            const entityCoreCycleProgressBeforeStepping: Ordinal<Segment[]> = use.Transition(
                segmentIndex,
                as.Transition<Segment[]>(notAs.Ordinal(entityDurationIndex)),
            )
            const entityCoreCycleProgressAfterStepping: Transition<Scalar[]> =
                as.Transition<Scalar[]>(use.Multiple(
                    floor(
                        notAs.Ordinal<Segment[]>(entityCoreCycleProgressBeforeStepping) / notAs.Cardinal(entityCount),
                    ),
                    as.Multiple(notAs.Cardinal(entityCount)),
                ))

            segmentDurationIndices.push(use.Cardinal(
                initialEntityDurationIndex,
                entityCoreCycleProgressAfterStepping,
            ))
        }

        return segmentDurationIndices
    }

export {
    computeSegmentDurationIndices,
}
