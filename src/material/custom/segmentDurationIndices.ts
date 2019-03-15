import {
    apply,
    floor,
    from,
    INITIAL,
    negative,
    NEXT,
    Ordinal,
    to,
    Translation,
    TRANSLATION_FROM_LENGTH_TO_LAST_INDEX,
} from '@musical-patterns/utilities'
import { ComputeSegmentDurationIndicesParameters } from './types'

const computeSegmentDurationIndices: (parameters: ComputeSegmentDurationIndicesParameters) => Ordinal[] =
    ({ segmentIndex, entityCount }: ComputeSegmentDurationIndicesParameters): Ordinal[] => {
        const output: Ordinal[] = []

        for (
            let entityIndex: Ordinal = INITIAL;
            entityIndex < to.Ordinal(from.Cardinal(entityCount));
            entityIndex = apply.Translation(entityIndex, NEXT)
        ) {
            const initialEntityDurationIndex: Ordinal = to.Ordinal(from.Cardinal(apply.Translation(
                apply.Translation(
                    entityCount,
                    TRANSLATION_FROM_LENGTH_TO_LAST_INDEX,
                ),
                to.Translation(from.Ordinal(negative(entityIndex))),
            )))
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
