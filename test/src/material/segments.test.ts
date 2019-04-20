import { computeNotesTotalCompiledDuration, Entity, Note, Segment } from '@musical-patterns/material'
import { as, Cardinal, insteadOf, length, Ms, NO_DURATION, notAs, ONE_MORE, use } from '@musical-patterns/utilities'
import { as as beatenPathTo, BeatenPathStyle, computeSegments, Core, spec } from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]

    const suite: (entityCount: Cardinal<Entity>) => void =
        (entityCount: Cardinal<Entity>): void => {
            it('each segment has a set of notes for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(length(segment))
                        .toBe(insteadOf<Cardinal, Note[]>(entityCount))
                })
            })

            it(`each segment's sets of notes each have the same total duration`, () => {
                segments.forEach((segment: Segment): void => {
                    let segmentDuration: Ms = NO_DURATION
                    segment.forEach((notes: Note[]): void => {
                        if (notAs.Ms(segmentDuration) === 0) {
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
                const seenTotalDurations: Ms[] = []
                segments.forEach((segment: Segment): void => {
                    const exemplarySegmentNotes: Note[] = segment[ 0 ]
                    const totalDuration: Ms = computeNotesTotalCompiledDuration(exemplarySegmentNotes)

                    seenTotalDurations.forEach((seenDuration: Ms): void => {
                        expect(seenDuration)
                            .not
                            .toBeCloseToTyped(totalDuration)
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })
        }

    let repetitions: Cardinal

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(6); core = use.Translation(core, as.Translation<Core>(1))) {
        for (let entityCount: Cardinal<Entity> = as.Cardinal<Entity>(2); entityCount <= as.Cardinal<Entity>(4); entityCount = use.Translation(entityCount, ONE_MORE)) {
            describe(`when core is ${core} and entity count is ${entityCount}`, () => {
                describe('without repetition of segments', () => {
                    beforeEach(() => {
                        repetitions = as.Cardinal(1)
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
                        repetitions = as.Cardinal(2)
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
