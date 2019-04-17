import { Note, Segment } from '@musical-patterns/material'
import {
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    Ms,
    Scalar,
    slice,
    to,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { BeatenPathSpecs, BeatenPathStyle } from '../../spec'
import { computeSegments } from '../segments'
import { distributeSegmentsToEntities } from './distributeSegmentsToEntities'
import { applySmooth, BeatenPathEntitiesNotes, pseudocompileDelay } from './smooth'

const computeEntitiesNotes: (specs: BeatenPathSpecs) => BeatenPathEntitiesNotes =
    ({
         baseDuration = to.Scalar<Ms>(1),
         baseDurationTranslation = to.Translation<Ms>(0),
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

        let delayScalars: Array<Scalar<Ms>> = []
        if (style === BeatenPathStyle.SMOOTH) {
            entitiesNotes = entitiesNotes.map((notes: Note[]) => {
                const { notes: smoothNotes, delayScalar } = applySmooth(notes, entityCount)
                delayScalars.push(delayScalar)

                return smoothNotes
            })
        }
        else {
            delayScalars =
                slice(ZERO_AND_POSITIVE_INTEGERS, INITIAL, indexJustBeyondFinalElementFromElementsTotal(entityCount))
                    .map(() => to.Scalar<Ms>(0))
        }

        const delays: Ms[] = delayScalars.map((delayScalar: Scalar<Ms>) => pseudocompileDelay({
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
