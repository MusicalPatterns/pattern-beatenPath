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
    ofNotAs,
    Ordinal,
    Scalar,
    Transition,
    use,
} from '@musical-patterns/utilities'
import { ComputeSegmentValueIndicesParameters } from './types'

const computeSegmentValueIndices: (parameters: {
    entityCount: Cardinal<Entity[]>,
    segmentIndex: Ordinal<Segment[]>,
}) => Array<Ordinal<Scalar[]>> =
    ({ segmentIndex, entityCount }: ComputeSegmentValueIndicesParameters): Array<Ordinal<Scalar[]>> => {
        const segmentValueIndices: Array<Ordinal<Scalar[]>> = []

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
                as.Transition<Segment[]>(as.number(entityDurationIndex)),
            )
            const entityCoreCycleProgressAfterStepping: Transition<Scalar[]> =
                as.Transition<Scalar[]>(use.Multiple(
                    floor(
                        as.number(entityCoreCycleProgressBeforeStepping) / as.number(entityCount),
                    ),
                    as.Multiple(as.number(entityCount)),
                ))

            segmentValueIndices.push(use.Cardinal(
                initialEntityDurationIndex,
                entityCoreCycleProgressAfterStepping,
            ))
        }

        return segmentValueIndices
    }

export {
    computeSegmentValueIndices,
}
