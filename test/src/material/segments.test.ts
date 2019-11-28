import { computeNotesDuration, Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, computeLength, Duration, insteadOf, NO_DURATION, ONE_MORE, use } from '@musical-patterns/utilities'
import { beatenPathAs, BeatenPathStyle, computeSegments, Core, Repetition, spec } from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]

    const suite: (entityCount: Cardinal<Entity[]>) => void =
        (entityCount: Cardinal<Entity[]>): void => {
            it('each segment has a set of notes for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(computeLength(segment))
                        .toBe(insteadOf<Cardinal, Segment>(entityCount))
                })
            })

            it(`each segment's sets of notes each have the same total value`, () => {
                segments.forEach((segment: Segment): void => {
                    let segmentValue: Duration = NO_DURATION
                    segment.forEach((notes: Note[]): void => {
                        if (segmentValue === NO_DURATION) {
                            segmentValue = computeNotesDuration(notes)
                        }
                        else {
                            expect(computeNotesDuration(notes))
                                .toBeCloseToTyped(segmentValue)
                        }
                    })
                })
            })

            it('each segment has a different total value than any other segment', () => {
                const seenTotalDurations: Duration[] = []
                segments.forEach((segment: Segment): void => {
                    const exemplarySegmentNotes: Note[] = segment[ 0 ]
                    const totalDuration: Duration = computeNotesDuration(exemplarySegmentNotes)

                    seenTotalDurations.forEach((seenDuration: Duration): void => {
                        expect(seenDuration)
                            .not
                            .toBeCloseToTyped(totalDuration)
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })
        }

    let repetitions: Cardinal<Repetition[]>

    for (let core: Core = beatenPathAs.Core(2); core <= beatenPathAs.Core(6); core = use.Cardinal(core, as.Cardinal<Core>(1))) {
        for (let entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(2); entityCount <= as.Cardinal<Entity[]>(4); entityCount = use.Cardinal(entityCount, ONE_MORE)) {
            describe(`when core is ${String(core)} and entity count is ${String(entityCount)}`, () => {
                describe('without repetition of segments', () => {
                    beforeEach(() => {
                        repetitions = as.Cardinal<Repetition[]>(1)
                    })

                    describe('in the polyrhythmic style', () => {
                        beforeEach(() => {
                            const style: BeatenPathStyle = spec.initialSpecs.style
                            segments = computeSegments({ entityCount, core, repetitions, style })
                        })

                        suite(entityCount)
                    })

                    describe('in the smooth style', () => {
                        beforeEach(() => {
                            const style: BeatenPathStyle = BeatenPathStyle.SMOOTH
                            segments = computeSegments({ entityCount, core, repetitions, style })
                        })

                        suite(entityCount)
                    })
                })

                describe('with repetition of segments', () => {
                    beforeEach(() => {
                        repetitions = as.Cardinal<Repetition[]>(2)
                    })

                    describe('in the polyrhythmic style', () => {
                        beforeEach(() => {
                            const style: BeatenPathStyle = spec.initialSpecs.style
                            segments = computeSegments({ entityCount, core, repetitions, style })
                        })

                        suite(entityCount)
                    })

                    describe('in the smooth style', () => {
                        beforeEach(() => {
                            const style: BeatenPathStyle = BeatenPathStyle.SMOOTH
                            segments = computeSegments({ entityCount, core, repetitions, style })
                        })

                        suite(entityCount)
                    })
                })
            })
        }
    }
})
