import { Entity, Segment } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    INCREMENT,
    indexJustBeyondFinalElement,
    INITIAL,
    insteadOf,
    Ordinal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { computeSegmentDurationIndices } from '../../../../src/indexForTest'

describe('segment duration indices', () => {
    describe('with entity count 2', () => {
        it('alternates which entity has its turn to leapfrog to the next duration from the core durations that neither entity is using yet', () => {
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(2)
            const expectedSegmentsDurationIndices: Array<Array<Ordinal<Scalar[]>>> = [
                [ 1, 0 ],
                [ 1, 2 ],
                [ 3, 2 ],
                [ 3, 4 ],
            ].map(
                (rawSegmentDurationIndices: number[]) =>
                    rawSegmentDurationIndices.map(
                        (rawSegmentDurationIndex: number) =>
                            as.Ordinal<Scalar[]>(rawSegmentDurationIndex),
                    ),
            )

            for (
                let segmentIndex: Ordinal<Segment[]> = INITIAL;
                segmentIndex < insteadOf<Ordinal, Segment>(indexJustBeyondFinalElement(expectedSegmentsDurationIndices));
                segmentIndex = use.Cardinal(segmentIndex, INCREMENT)
            ) {
                const segmentDurationIndices: Array<Ordinal<Scalar[]>> = computeSegmentDurationIndices({
                    entityCount,
                    segmentIndex,
                })

                expect(segmentDurationIndices)
                    .toEqual(use.Ordinal(
                        expectedSegmentsDurationIndices,
                        insteadOf<Ordinal, Array<Array<Ordinal<Scalar[]>>>>(segmentIndex),
                    ))
            }
        })
    })

    describe('with entity count 3', () => {
        it('cycles which entity has its turn to leapfrog to the next duration from the core durations that no entity is using yet', () => {
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)
            const expectedSegmentsDurationIndices: Array<Array<Ordinal<Scalar[]>>> = [
                [ 2, 1, 0 ],
                [ 2, 1, 3 ],
                [ 2, 4, 3 ],
                [ 5, 4, 3 ],
                [ 5, 4, 6 ],
                [ 5, 7, 6 ],
                [ 8, 7, 6 ],
                [ 8, 7, 9 ],
            ].map(
                (rawSegmentDurationIndices: number[]) =>
                    rawSegmentDurationIndices.map(
                        (rawSegmentDurationIndex: number) =>
                            as.Ordinal<Scalar[]>(rawSegmentDurationIndex),
                    ),
            )

            for (
                let segmentIndex: Ordinal<Segment[]> = INITIAL;
                segmentIndex < insteadOf<Ordinal, Segment>(indexJustBeyondFinalElement(expectedSegmentsDurationIndices));
                segmentIndex = use.Cardinal(segmentIndex, INCREMENT)
            ) {
                const segmentDurationIndices: Array<Ordinal<Scalar[]>> = computeSegmentDurationIndices({
                    entityCount,
                    segmentIndex,
                })

                expect(segmentDurationIndices)
                    .toEqual(use.Ordinal(
                        expectedSegmentsDurationIndices,
                        insteadOf<Ordinal, Array<Array<Ordinal<Scalar[]>>>>(segmentIndex),
                    ))
            }
        })
    })
})
