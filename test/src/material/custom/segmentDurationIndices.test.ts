import { apply, Cardinal, INITIAL, NEXT, Ordinal, to, totalElements } from '@musical-patterns/utilities'
import { computeSegmentDurationIndices } from '../../../../src/indexForTest'

describe('segment duration indices', () => {
    describe('with entity count 2', () => {
        it('alternates which entity has its turn to leapfrog to the next duration from the core durations that neither entity is using yet', () => {
            const entityCount: Cardinal = to.Cardinal(2)
            const expectedSegmentsDurationIndices: Ordinal[][] = [
                [ 1, 0 ],
                [ 1, 2 ],
                [ 3, 2 ],
                [ 3, 4 ],
            ].map((rawSegmentDurationIndices: number[]) => rawSegmentDurationIndices.map(to.Ordinal))

            for (
                let segmentIndex: Ordinal = INITIAL;
                segmentIndex < totalElements(expectedSegmentsDurationIndices);
                segmentIndex = apply.Translation(segmentIndex, NEXT)
            ) {
                const segmentDurationIndices: Ordinal[] = computeSegmentDurationIndices({ entityCount, segmentIndex })

                expect(segmentDurationIndices)
                    .toEqual(apply.Ordinal(expectedSegmentsDurationIndices, segmentIndex))
            }
        })
    })

    describe('with entity count 3', () => {
        it('cycles which entity has its turn to leapfrog to the next duration from the core durations that no entity is using yet', () => {
            const entityCount: Cardinal = to.Cardinal(3)
            const expectedSegmentsDurationIndices: Ordinal[][] = [
                [ 2, 1, 0 ],
                [ 2, 1, 3 ],
                [ 2, 4, 3 ],
                [ 5, 4, 3 ],
                [ 5, 4, 6 ],
                [ 5, 7, 6 ],
                [ 8, 7, 6 ],
                [ 8, 7, 9 ],
            ].map((rawSegmentDurationIndices: number[]) => rawSegmentDurationIndices.map(to.Ordinal))

            for (
                let segmentIndex: Ordinal = INITIAL;
                segmentIndex < totalElements(expectedSegmentsDurationIndices);
                segmentIndex = apply.Translation(segmentIndex, NEXT)
            ) {
                const segmentDurationIndices: Ordinal[] = computeSegmentDurationIndices({ entityCount, segmentIndex })

                expect(segmentDurationIndices)
                    .toEqual(apply.Ordinal(expectedSegmentsDurationIndices, segmentIndex))
            }
        })
    })
})
