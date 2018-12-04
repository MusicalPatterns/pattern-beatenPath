import { BuildEntitiesFunction, Entity, PartSpec, TimbreName } from '@musical-patterns/compiler'
import { DictionaryOf } from '@musical-patterns/utilities'
import { BeatenPathPatternSpec } from '../types'
import { buildParts } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: BeatenPathPatternSpec): Entity[] => {
        const {
            beatenPathOnePart,
            beatenPathTwoPart,
        }: DictionaryOf<PartSpec> = buildParts(patternSpec)

        const beatenPathOneEntity: Entity = {
            partSpec: beatenPathOnePart,
            timbreName: TimbreName.SQUARE,
        }

        const beatenPathTwoEntity: Entity = {
            partSpec: beatenPathTwoPart,
            timbreName: TimbreName.SAWTOOTH,
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildEntities,
}
