import { Note, Segment } from '@musical-patterns/material'
import {
    as,
    Duration,
    Ms,
    range,
    Scalar,
} from '@musical-patterns/utilities'
import { BeatenPathSpecs, BeatenPathStyle } from '../../spec'
import { computeSegments } from '../segments'
import { distributeSegmentsToEntities } from './distributeSegmentsToEntities'
import { applySmooth, BeatenPathEntitiesNotes, pseudocompileDelay } from './smooth'

const computeEntitiesNotes: (specs: BeatenPathSpecs) => BeatenPathEntitiesNotes =
    ({
         baseDuration = as.Delta<Ms>(1),
         baseDurationTranslation = as.Translation<Duration>(0),
         core,
         entityCount,
         repetitions,
         reverse,
         style,
     }: BeatenPathSpecs): BeatenPathEntitiesNotes => {
        const segments: Segment[] = computeSegments({ core, entityCount, repetitions, style })

        let entitiesNotes: Note[][] = distributeSegmentsToEntities(segments)

        if (reverse) {
            entitiesNotes.forEach((notes: Note[]) => {
                notes.reverse()
            })
        }

        let delayScalars: Array<Scalar<Duration>> = []
        if (style === BeatenPathStyle.SMOOTH) {
            entitiesNotes = entitiesNotes.map((notes: Note[]) => {
                const { notes: smoothNotes, delayScalar } = applySmooth(notes, entityCount)
                delayScalars.push(delayScalar)

                return smoothNotes
            })
        }
        else {
            delayScalars = range(entityCount)
                .map(() => as.Scalar<Duration>(0))
        }

        const delays: Duration[] = delayScalars.map((delayScalar: Scalar<Duration>) => pseudocompileDelay({
            baseDuration,
            baseDurationTranslation,
            delayScalar,
        }))

        return {
            delays,
            entitiesNotes,
        }
    }

export {
    computeEntitiesNotes,
}
