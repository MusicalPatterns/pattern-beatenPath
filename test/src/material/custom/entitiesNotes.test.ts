import {
    compilePattern,
    computeNotesDuration,
    Entity,
    materializeStandardScales,
    Note,
    Scales,
    Segment,
} from '@musical-patterns/material'
import {
    as,
    Duration,
    forEach,
    indexOfFinalElement,
    negative,
    NO_DURATION,
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

describe('entities notes', (): void => {
    it('can reverse', (): void => {
        const forwardSpecs: BeatenPathSpecs = spec.initialSpecs
        const { entitiesNotes: forwardVersion }: BeatenPathEntitiesNotes = computeEntitiesNotes(forwardSpecs)

        const backwardSpecs: BeatenPathSpecs = { ...spec.initialSpecs, reverse: true }
        const { entitiesNotes: backwardVersion }: BeatenPathEntitiesNotes = computeEntitiesNotes(backwardSpecs)

        forEach(
            forwardVersion,
            (notes: Note[], entityIndex: Ordinal<Segment>): void => {
                forEach(notes, (note: Note, index: Ordinal<Note[]>): void => {
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

    describe('total pattern duration', (): void => {
        it(
            `the segment construction, equalizing, distributing, and doing all loops is all executed such that \
the total duration of the pattern won't be multiple years long (lol) \
because the entity notes have sliiiiightly different values; \
I'm using standard scales here because that's what the pattern uses and I want it to be at a realistic scale \
(read: not using base duration of 1ms, but the standard 700ms) so when it checks closeness it means something`,
            async (done: DoneFn): Promise<void> => {
                const specs: BeatenPathSpecs = spec.initialSpecs

                const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
                const scales: Scales = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Duration = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Duration = computeNotesDuration(entityNotes, scales)
                    if (expectedEntityNotesDuration === NO_DURATION) {
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
you can't simply equalize values on the final segment, but every segment that is touched by the duration which should be something \
very very close to 1 but is instead substituted by 1 itself for looping back around, and the more entities there are \
the more segments each entity holds each of its values for before changing, so the more that will be touched by this substitution`,
            async (done: DoneFn): Promise<void> => {
                const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: as.Cardinal<Entity[]>(3) }

                const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
                const scales: Scales = materializeStandardScales(specs)
                let expectedEntityNotesDuration: Duration = NO_DURATION
                entitiesNotes.forEach((entityNotes: Note[]): void => {
                    const entityNotesDuration: Duration = computeNotesDuration(entityNotes, scales)
                    if (expectedEntityNotesDuration === NO_DURATION) {
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

        it('an even higher entity count example just to ensure we do things in a generalizable way', async (done: DoneFn): Promise<void> => {
            const specs: BeatenPathSpecs = { ...spec.initialSpecs, entityCount: as.Cardinal<Entity[]>(4) }

            const { entitiesNotes }: BeatenPathEntitiesNotes = computeEntitiesNotes(specs)
            const scales: Scales = materializeStandardScales(specs)
            let expectedEntityNotesDuration: Duration = NO_DURATION
            entitiesNotes.forEach((entityNotes: Note[]): void => {
                const entityNotesDuration: Duration = computeNotesDuration(entityNotes, scales)
                if (expectedEntityNotesDuration === NO_DURATION) {
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
