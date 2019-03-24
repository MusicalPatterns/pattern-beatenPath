import {
    apply,
    finalIndexFromElementsTotal,
    floor,
    from,
    INITIAL,
    negative,
    NEXT,
    Ordinal,
    to,
    Translation,
} from '@musical-patterns/utilities'
import { ComputeSegmentDurationIndicesParameters } from './types'

const computeSegmentDurationIndices: (parameters: ComputeSegmentDurationIndicesParameters) => Ordinal[] =
    ({ segmentIndex, entityCount }: ComputeSegmentDurationIndicesParameters): Ordinal[] => {
        const output: Ordinal[] = []

        for (
            let entityIndex: Ordinal = INITIAL;
            entityIndex <= finalIndexFromElementsTotal(entityCount);
            entityIndex = apply.Translation(entityIndex, NEXT)
        ) {
            const initialEntityDurationIndex: Ordinal = apply.Translation(
                finalIndexFromElementsTotal(entityCount),
                to.Translation(from.Ordinal(negative(entityIndex))),
            )
            const entityCoreCycleProgressBeforeStepping: Ordinal = apply.Translation(
                segmentIndex,
                to.Translation(from.Ordinal(entityIndex)),
            )
            const entityCoreCycleProgressAfterStepping: Translation = to.Translation(apply.Scalar(
                floor(from.Ordinal(entityCoreCycleProgressBeforeStepping) / from.Cardinal(entityCount)),
                to.Scalar(from.Cardinal(entityCount)),
            ))

            output.push(to.Ordinal(apply.Translation(
                initialEntityDurationIndex,
                entityCoreCycleProgressAfterStepping,
            )))
        }

        return output
    }

export {
    computeSegmentDurationIndices,
}
