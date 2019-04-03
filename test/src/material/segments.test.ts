import { computeNotesTotalCompiledDuration, Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    from,
    Ms,
    NEXT,
    NO_DURATION,
    testIsCloseTo,
    testIsNotCloseTo,
    to,
} from '@musical-patterns/utilities'
import { BeatenPathStyle, computeSegments, Core, spec, to as beatenPathTo } from '../../../src/indexForTest'

describe('segments', () => {
    let segments: Segment[]

    const suite: (entityCount: Cardinal) => void =
        (entityCount: Cardinal): void => {
            it('each segment has a set of notes for each entity', () => {
                segments.forEach((segment: Segment): void => {
                    expect(segment.length)
                        .toBe(entityCount)
                })
            })

            it(`each segment's sets of notes each have the same total duration`, () => {
                segments.forEach((segment: Segment): void => {
                    let segmentDuration: Ms = NO_DURATION
                    segment.forEach((notes: Note[]): void => {
                        if (from.Ms(segmentDuration) === 0) {
                            segmentDuration = computeNotesTotalCompiledDuration(notes)
                        }
                        else {
                            testIsCloseTo(
                                from.Ms(computeNotesTotalCompiledDuration(notes)),
                                from.Ms(segmentDuration),
                            )
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
                        testIsNotCloseTo(
                            from.Ms(seenDuration),
                            from.Ms(totalDuration),
                        )
                    })

                    seenTotalDurations.push(totalDuration)
                })
            })
        }

    let repetitions: Cardinal

    for (let core: Core = beatenPathTo.Core(2); core <= beatenPathTo.Core(6); core = apply.Translation(core, NEXT)) {
        for (let entityCount: Cardinal = to.Cardinal(2); entityCount <= to.Cardinal(4); entityCount = apply.Translation(entityCount, NEXT)) {
            describe(`when core is ${core} and entity count is ${entityCount}`, () => {
                describe('without repetition of segments', () => {
                    beforeEach(() => {
                        repetitions = to.Cardinal(1)
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
                        repetitions = to.Cardinal(2)
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
