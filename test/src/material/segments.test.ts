import { computeNotesTotalCompiledDuration, Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, insteadOf, length, Ms, NO_DURATION, notAs, ONE_MORE, Translation, use } from '@musical-patterns/utilities'
import { as as beatenPathTo, BeatenPathStyle, computeSegments, Core, Repetition, spec } from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]

    const suite: (entityCount: Cardinal<Entity[]>) => void =
        (entityCount: Cardinal<Entity[]>): void => {
            it('each segment has a set of notes for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(length(segment))
                        .toBe(insteadOf<Cardinal, Segment>(entityCount))
                })
            })

            it(`each segment's sets of notes each have the same total duration`, () => {
                segments.forEach((segment: Segment): void => {
                    let segmentDuration: Translation<Ms> = NO_DURATION
                    segment.forEach((notes: Note[]): void => {
                        if (segmentDuration === NO_DURATION) {
                            segmentDuration = computeNotesTotalCompiledDuration(notes)
                        }
                        else {
                            expect(computeNotesTotalCompiledDuration(notes))
                                .toBeCloseToTyped(segmentDuration)
                        }
                    })
                })
            })

            it('each segment has a different total duration than any other segment', () => {
                const seenTotalDurations: Array<Translation<Ms>> = []
                segments.forEach((segment: Segment): void => {
                    const exemplarySegmentNotes: Note[] = segment[ 0 ]
                    const totalDuration: Translation<Ms> = computeNotesTotalCompiledDuration(exemplarySegmentNotes)

                    seenTotalDurations.forEach((seenDuration: Translation<Ms>): void => {
                        expect(seenDuration)
                            .not
                            .toBeCloseToTyped(totalDuration)
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })
        }

    let repetitions: Cardinal<Repetition[]>

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(6); core = use.Cardinal(core, as.Cardinal<Core>(1))) {
        for (let entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(2); entityCount <= as.Cardinal<Entity[]>(4); entityCount = use.Cardinal(entityCount, ONE_MORE)) {
            describe(`when core is ${core} and entity count is ${entityCount}`, () => {
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
