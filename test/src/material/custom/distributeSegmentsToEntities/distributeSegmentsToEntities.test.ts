import { Note, Segment } from '@musical-patterns/material'
import { distributeSegmentsToEntities } from '../../../../../src/indexForTest'

describe('distribute segments to entities', () => {
    it(
        `when cycle length is 4, entity count is 3 - it loops through the segments 3 times, cycling the segments by 1 each time, \
until the entities are back at starting positions. you can see that each entity stays with each note a # of times equal to the entity count, \
as long as you count the _2 version of it as the same as the _1 version (which it is, it just represents modulus around the cycle length`,
        () => {
            const A_1: Note = { intensity: {} }
            const B_1: Note = { value: {} }
            const C_1: Note = { envelope: {} }
            const D_1: Note = { pitch: {} }
            const A_2: Note = { intensity: {} }
            const B_2: Note = { value: {} }

            const segments: Segment[] = [
                [
                    [ C_1 ], // (Fourth, D changes to C)
                    [ B_1 ],
                    [ A_1 ],
                ],
                [
                    [ C_1 ],
                    [ B_1 ],
                    [ D_1 ], // First, A changes to D
                ],
                [
                    [ C_1 ],
                    [ A_2 ], // Second, B changes to A
                    [ D_1 ],
                ],
                [
                    [ B_2 ], // Third, C changes to B
                    [ A_2 ],
                    [ D_1 ],
                ],
            ]

            const actualEntitiesNotesFromSegments: Note[][] = distributeSegmentsToEntities(segments)

            const expectedEntityNotesOne: Note[] = [
                C_1, C_1, C_1, B_2,
                B_1, B_1, A_2, A_2,
                A_1, D_1, D_1, D_1,
            ]
            const expectedEntityNotesTwo: Note[] = [
                B_1, B_1, A_2, A_2,
                A_1, D_1, D_1, D_1,
                C_1, C_1, C_1, B_2,
            ]
            const expectedEntityNotesThree: Note[] = [
                A_1, D_1, D_1, D_1,
                C_1, C_1, C_1, B_2,
                B_1, B_1, A_2, A_2,
            ]

            expect(actualEntitiesNotesFromSegments)
                .toEqual([
                    expectedEntityNotesOne,
                    expectedEntityNotesTwo,
                    expectedEntityNotesThree,
                ])
        },
    )

    it(
        `also works when the cycle length and entity count share a common factor other than each other, e.g 6 and 4 respectively; \
in this case it loops through 2 times, cycling the segments by 2 each time (so it skips half of the segment rotation possibilities)`,
        () => {
            const A_1: Note = { intensity: {} }
            const B_1: Note = { value: {} }
            const C_1: Note = { envelope: {} }
            const D_1: Note = { pitch: {} }
            const E_1: Note = { position: {} }
            const F_1: Note = { intensity: {}, value: {} }
            const A_2: Note = { intensity: {} }
            const B_2: Note = { value: {} }
            const C_2: Note = { envelope: {} }

            const segments: Segment[] = [
                [
                    [ D_1 ], // (Sixth, F changes to D)
                    [ C_1 ],
                    [ B_1 ],
                    [ A_1 ],
                ],
                [
                    [ D_1 ],
                    [ C_1 ],
                    [ B_1 ],
                    [ E_1 ], // First, A changes to E
                ],
                [
                    [ D_1 ],
                    [ C_1 ],
                    [ F_1 ], // Second, B changes to F
                    [ E_1 ],
                ],
                [
                    [ D_1 ],
                    [ A_2 ], // Third, C changes to A
                    [ F_1 ],
                    [ E_1 ],
                ],
                [
                    [ B_2 ], // Fourth, D changes to B
                    [ A_2 ],
                    [ F_1 ],
                    [ E_1 ],
                ],
                [
                    [ B_2 ],
                    [ A_2 ],
                    [ F_1 ],
                    [ C_2 ], // Fifth, E changes to C
                ],
            ]

            const actualEntitiesNotesFromSegments: Note[][] = distributeSegmentsToEntities(segments)

            const expectedEntityNotesOne: Note[] = [
                D_1, D_1, D_1, D_1, B_2, B_2,
                B_1, B_1, F_1, F_1, F_1, F_1,
            ]
            const expectedEntityNotesTwo: Note[] = [
                C_1, C_1, C_1, A_2, A_2, A_2,
                A_1, E_1, E_1, E_1, E_1, C_2,
            ]
            const expectedEntityNotesThree: Note[] = [
                B_1, B_1, F_1, F_1, F_1, F_1,
                D_1, D_1, D_1, D_1, B_2, B_2,
            ]
            const expectedEntityNotesFour: Note[] = [
                A_1, E_1, E_1, E_1, E_1, C_2,
                C_1, C_1, C_1, A_2, A_2, A_2,
            ]

            expect(actualEntitiesNotesFromSegments)
                .toEqual([
                    expectedEntityNotesOne,
                    expectedEntityNotesTwo,
                    expectedEntityNotesThree,
                    expectedEntityNotesFour,
                ])
        },
    )
})
