import { Entity, NoteSpec, OscillatorName, sequence, TimeType, VoiceType } from '../../../src'
import { buildBeatenPathBlocks } from './blocks'
import { MINIMUM_FUNCTIONAL_CORE } from './constants'
import { buildBeatenPathDurationsAndRatios } from './durationsAndRatios'
import { Core } from './nominal'
import { BeatenPathSongSpec, Block, Blocks } from './types'

const buildBeatenPathEntities: (songSpec: BeatenPathSongSpec) => Entity[] =
    (songSpec: BeatenPathSongSpec): Entity[] => {
        const coreFromSongSpec: Core = songSpec.core
        const core: Core = coreFromSongSpec < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : coreFromSongSpec

        const { beatenPathRatios, beatenPathDurations } = buildBeatenPathDurationsAndRatios(core)
        const beatenPathBlocks: Blocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)

        const beatenPathOneNoteSpecs: NoteSpec[] = sequence(
            beatenPathBlocks.map((block: Block): NoteSpec[] => block[ 0 ]),
        )
        const beatenPathTwoNoteSpecs: NoteSpec[] = sequence(
            beatenPathBlocks.map((block: Block): NoteSpec[] => block[ 1 ]),
        )

        const beatenPathOneEntity: Entity = {
            noteSpecs: beatenPathOneNoteSpecs,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const beatenPathTwoEntity: Entity = {
            noteSpecs: beatenPathTwoNoteSpecs,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildBeatenPathEntities,
}
