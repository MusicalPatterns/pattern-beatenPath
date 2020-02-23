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
import { computeSegmentValueIndices } from '../../../../src/indexForTest'

describe('segment value indices', (): void => {
    describe('with entity count 2', (): void => {
        it('alternates which entity has its turn to leapfrog to the next value from the core values that neither entity is using yet', (): void => {
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(2)
            const expectedSegmentsValueIndices: Array<Array<Ordinal<Scalar[]>>> = [
                [ 1, 0 ],
                [ 1, 2 ],
                [ 3, 2 ],
                [ 3, 4 ],
            ].map(
                (rawSegmentValueIndices: number[]): Array<Ordinal<Scalar[]>> =>
                    rawSegmentValueIndices.map(
                        (rawSegmentValueIndex: number): Ordinal<Scalar[]> =>
                            as.Ordinal<Scalar[]>(rawSegmentValueIndex),
                    ),
            )

            for (
                let segmentIndex: Ordinal<Segment[]> = INITIAL;
                segmentIndex < insteadOf<Ordinal, Segment>(indexJustBeyondFinalElement(expectedSegmentsValueIndices));
                segmentIndex = use.Cardinal(segmentIndex, INCREMENT)
            ) {
                const segmentValueIndices: Array<Ordinal<Scalar[]>> = computeSegmentValueIndices({
                    entityCount,
                    segmentIndex,
                })

                expect(segmentValueIndices)
                    .toEqual(use.Ordinal(
                        expectedSegmentsValueIndices,
                        insteadOf<Ordinal, Array<Array<Ordinal<Scalar[]>>>>(segmentIndex),
                    ))
            }
        })
    })

    describe('with entity count 3', (): void => {
        it('cycles which entity has its turn to leapfrog to the next value from the core values that no entity is using yet', (): void => {
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)
            const expectedSegmentsValueIndices: Array<Array<Ordinal<Scalar[]>>> = [
                [ 2, 1, 0 ],
                [ 2, 1, 3 ],
                [ 2, 4, 3 ],
                [ 5, 4, 3 ],
                [ 5, 4, 6 ],
                [ 5, 7, 6 ],
                [ 8, 7, 6 ],
                [ 8, 7, 9 ],
            ].map(
                (rawSegmentValueIndices: number[]): Array<Ordinal<Scalar[]>> =>
                    rawSegmentValueIndices.map(
                        (rawSegmentValueIndex: number): Ordinal<Scalar[]> =>
                            as.Ordinal<Scalar[]>(rawSegmentValueIndex),
                    ),
            )

            for (
                let segmentIndex: Ordinal<Segment[]> = INITIAL;
                segmentIndex < insteadOf<Ordinal, Segment>(indexJustBeyondFinalElement(expectedSegmentsValueIndices));
                segmentIndex = use.Cardinal(segmentIndex, INCREMENT)
            ) {
                const segmentValueIndices: Array<Ordinal<Scalar[]>> = computeSegmentValueIndices({
                    entityCount,
                    segmentIndex,
                })

                expect(segmentValueIndices)
                    .toEqual(use.Ordinal(
                        expectedSegmentsValueIndices,
                        insteadOf<Ordinal, Array<Array<Ordinal<Scalar[]>>>>(segmentIndex),
                    ))
            }
        })
    })
})
