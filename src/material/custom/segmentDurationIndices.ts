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
    Translation,
    use,
} from '@musical-patterns/utilities'
import { ComputeSegmentDurationIndicesParameters } from './types'

const computeSegmentDurationIndices: (parameters: {
    entityCount: Cardinal<Entity>,
    segmentIndex: Ordinal<Segment>,
}) => Array<Ordinal<Scalar>> =
    ({ segmentIndex, entityCount }: ComputeSegmentDurationIndicesParameters): Array<Ordinal<Scalar>> => {
        const segmentDurationIndices: Array<Ordinal<Scalar>> = []

        for (
            let entityDurationIndex: Ordinal<Scalar> = INITIAL;
            entityDurationIndex <= insteadOf<Ordinal, Scalar>(finalIndexFromElementsTotal(entityCount));
            entityDurationIndex = use.Translation(entityDurationIndex, INCREMENT)
        ) {
            const initialEntityDurationIndex: Ordinal<Scalar> = use.Translation(
                insteadOf<Ordinal, Scalar>(finalIndexFromElementsTotal(entityCount)),
                as.Translation(ofNotAs(negative(entityDurationIndex))),
            )
            const entityCoreCycleProgressBeforeStepping: Ordinal<Segment> = use.Translation(
                segmentIndex,
                as.Translation<Ordinal<Segment>>(notAs.Ordinal(entityDurationIndex)),
            )
            const entityCoreCycleProgressAfterStepping: Translation<Ordinal<Scalar>> =
                as.Translation<Ordinal<Scalar>>(use.Scalar(
                    floor(notAs.Ordinal<Segment>(entityCoreCycleProgressBeforeStepping) / notAs.Cardinal(entityCount)),
                    as.Scalar(notAs.Cardinal(entityCount)),
                ))

            segmentDurationIndices.push(use.Translation(
                initialEntityDurationIndex,
                entityCoreCycleProgressAfterStepping,
            ))
        }

        return segmentDurationIndices
    }

export {
    computeSegmentDurationIndices,
}
