import {
    compilePattern,
    computeNotesTotalCompiledDuration,
    Entity,
    materializeStandardScales,
    Note,
    Scale,
    Segment,
} from '@musical-patterns/material'
import {
    as,
    forEach,
    indexOfFinalElement,
    Ms,
    negative,
    NO_DURATION,
    notAs,
    ofNotAs,
    ONE_HOUR,
    Ordinal,
    use,
} from '@musical-patterns/utilities'
import {
    BeatenPathEntitiesNotes,
    BeatenPathSpecs,
    computeEntitiesNotes,
    material,
    spec,
} from '../../../../src/indexForTest'

describe('entities notes', () => {
    it('can reverse', () => {
        const forwardSpecs: BeatenPathSpecs = spec.initialSpecs
        const { entitiesNotes: forwardVersion }: BeatenPathEntitiesNotes = computeEntitiesNotes(forwardSpecs)

        const backwardSpecs: BeatenPathSpecs = { ...spec.initialSpecs, reverse: true }
        const { entitiesNotes: backwardVersion }: BeatenPathEntitiesNotes = computeEntitiesNotes(backwardSpecs)

        forEach(
            forwardVersion,
            (notes: Note[], entityIndex: Ordinal<Segment>): void => {
                forEach(notes, (note: Note, index: Ordinal<Note[]>) => {
                    const backwardNotes: Note[] = use.Ordinal(backwardVersion, entityIndex)
                    const mirroredIndex: Ordinal<Note[]> = use.Cardinal(
                        indexOfFinalElement(notes),
                        as.Cardinal(ofNotAs(negative(index))),
                    )
                    const mirroredNote: Note = use.Ordinal(backwardNotes, mirroredIndex)

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

                const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
                const scales: Scale[] = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Ms = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                    if (notAs.Ms(expectedEntityNotesDuration) === 0) {
                        expectedEntityNotesDuration = entityNotesDuration
                    }
                    else {
                        expect(entityNotesDuration)
                            .toBeCloseToTyped(expectedEntityNotesDuration)
                    }
                })

                const { totalDuration } = await compilePattern({ specs, material })
                expect(totalDuration)
                    .toBeLessThanTyped(ONE_HOUR)

                done()
            },
        )

        it(
            `also works when entity count is greater than 2 (it makes a difference because massaging approach needs to change; \
you can't simply equalize durations on the final segment, but every segment that is touched by the duration which should be something \
very very close to 1 but is instead substituted by 1 itself for looping back around, and the more entities there are \
the more segments each entity holds each of its durations for before changing, so the more that will be touched by this substitution`,
            async (done: DoneFn) => {
                const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: as.Cardinal<Entity[]>(3) }

                const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
                const scales: Scale[] = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Ms = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                    if (notAs.Ms(expectedEntityNotesDuration) === 0) {
                        expectedEntityNotesDuration = entityNotesDuration
                    }
                    else {
                        expect(entityNotesDuration)
                            .toBeCloseToTyped(expectedEntityNotesDuration)
                    }
                })

                const { totalDuration } = await compilePattern({ specs, material })
                expect(notAs.Ms(totalDuration))
                    .toBeLessThan(notAs.Ms(ONE_HOUR))

                done()
            },
        )

        it('an even higher entity count example just to ensure we do things in a generalizable way', async (done: DoneFn) => {
            const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: as.Cardinal<Entity[]>(4) }

            const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
            const scales: Scale[] = materializeStandardScales(specs)
            let expectedEntityNotesDuration: Ms = NO_DURATION
            entitiesNotes.forEach((entityNotes: Note[]): void => {
                const entityNotesDuration: Ms = computeNotesTotalCompiledDuration(entityNotes, scales)
                if (notAs.Ms(expectedEntityNotesDuration) === 0) {
                    expectedEntityNotesDuration = entityNotesDuration
                }
                else {
                    expect(entityNotesDuration)
                        .toBeCloseToTyped(expectedEntityNotesDuration)
                }
            })

            const { totalDuration } = await compilePattern({ specs, material })
            expect(totalDuration)
                .toBeLessThanTyped(ONE_HOUR)

            done()
        })
    })
})
