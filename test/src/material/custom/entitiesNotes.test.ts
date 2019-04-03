import { compilePattern, computeNotesTotalCompiledDuration, Note, Scale } from '@musical-patterns/compiler'
import { materializeStandardScales } from '@musical-patterns/pattern'
import {
    apply,
    difference,
    forEach,
    from,
    indexOfFinalElement,
    Ms,
    NO_DURATION,
    ONE_HOUR,
    Ordinal,
    testIsCloseTo,
    testIsLessThan,
    to,
} from '@musical-patterns/utilities'
import { BeatenPathSpecs, computeEntitiesNotes, material, spec } from '../../../../src/indexForTest'

describe('entities notes', () => {
    it('can reverse', () => {
        const forwardSpecs: BeatenPathSpecs = spec.initialSpecs
        const forwardVersion: Note[][] = computeEntitiesNotes(forwardSpecs)

        const backwardSpecs: BeatenPathSpecs = { ...spec.initialSpecs, reverse: true }
        const backwardVersion: Note[][] = computeEntitiesNotes(backwardSpecs)

        forEach(
            forwardVersion,
            (notes: Note[], entityIndex: Ordinal): void => {
                forEach(notes, (note: Note, index: Ordinal) => {
                    const backwardNotes: Note[] = apply.Ordinal(backwardVersion, entityIndex)
                    const mirroredIndex: Ordinal = difference(indexOfFinalElement(notes), index)
                    const mirroredNote: Note = apply.Ordinal(backwardNotes, mirroredIndex)

                    expect(note)
                        .toEqual(mirroredNote)
                })
            })
    })

    describe('total pattern duration', () => {
        it(
            `the segment construction, equalizing, distributing, and doing all loops is all executed such that \
the total duration of the pattern won't be multiple years long (lol) \
because the entity notes have sliiiiightly different durations; \
I'm using standard scales here because that's what the pattern uses and I want it to be at a realistic scale \
(read: not using base duration of 1ms, but the standard 700ms) so when it checks closeness it means something`,
            async (done: DoneFn) => {
                const specs: BeatenPathSpecs = spec.initialSpecs

                const entitiesNotes: Note[][] = computeEntitiesNotes(specs)
                const scales: Scale[] = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Ms = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                    if (from.Ms(expectedEntityNotesDuration) === 0) {
                        expectedEntityNotesDuration = entityNotesDuration
                    }
                    else {
                        testIsCloseTo(
                            from.Ms(entityNotesDuration),
                            from.Ms(expectedEntityNotesDuration),
                        )
                    }
                })

                const { totalDuration } = await compilePattern({ specs, material })
                testIsLessThan(totalDuration, ONE_HOUR)

                done()
            },
        )

        it(
            `also works when entity count is greater than 2 (it makes a difference because massaging approach needs to change; \
you can't simply equalize durations on the final segment, but every segment that is touched by the duration which should be something \
very very close to 1 but is instead substituted by 1 itself for looping back around, and the more entities there are \
the more segments each entity holds each of its durations for before changing, so the more that will be touched by this substitution`,
            async (done: DoneFn) => {
                const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: to.Cardinal(3) }

                const entitiesNotes: Note[][] = computeEntitiesNotes(specs)
                const scales: Scale[] = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Ms = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                    if (from.Ms(expectedEntityNotesDuration) === 0) {
                        expectedEntityNotesDuration = entityNotesDuration
                    }
                    else {
                        testIsCloseTo(
                            from.Ms(entityNotesDuration),
                            from.Ms(expectedEntityNotesDuration),
                        )
                    }
                })

                const { totalDuration } = await compilePattern({ specs, material })
                expect(from.Ms(totalDuration))
                    .toBeLessThan(from.Ms(ONE_HOUR))

                done()
            },
        )

        it('an even higher entity count example just to ensure we do things in a generalizable way', async (done: DoneFn) => {
            const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: to.Cardinal(4) }

            const entitiesNotes: Note[][] = computeEntitiesNotes(specs)
            const scales: Scale[] = materializeStandardScales(specs)
            let expectedEntityNotesDuration: Ms = NO_DURATION
            entitiesNotes.forEach((entityNotes: Note[]): void => {
                const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                if (from.Ms(expectedEntityNotesDuration) === 0) {
                    expectedEntityNotesDuration = entityNotesDuration
                }
                else {
                    testIsCloseTo(
                        from.Ms(entityNotesDuration),
                        from.Ms(expectedEntityNotesDuration),
                    )
                }
            })

            const { totalDuration } = await compilePattern({ specs, material })
            testIsLessThan(totalDuration, ONE_HOUR)

            done()
        })
    })
})
