import { compileEntity } from '../../../src/compile/compileEntity'
import { EntitySpec, EntitySpecs } from '../../../src/compile/types'
import { Config, Song, SongID, SongSpec } from '../../../src/songTypes'
import { Entity } from '../../../src/types'
import { buildBeatenPathBlocks } from './blocks'
import { buildBeatenPathDurationsAndRatios } from './durationsAndRatios'
import { buildBeatenPathEntitySpecs } from './entities'
import { Blocks, Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const MINIMUM_FUNCTIONAL_CORE: Core = 2 as any

interface BeatenPathConfig extends Config {
    core: Core,
}

const compileBeatenPathSong: (songSpec: SongSpec) => Promise<Song> =
    async (songSpec: SongSpec): Promise<Song> => {
        const config: BeatenPathConfig = songSpec.config as BeatenPathConfig
        const configCore: Core = config.core
        const core: Core = configCore < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : configCore

        const { beatenPathRatios, beatenPathDurations } = buildBeatenPathDurationsAndRatios(core)
        const beatenPathBlocks: Blocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)
        const beatenPathEntitySpecs: EntitySpecs = buildBeatenPathEntitySpecs(beatenPathBlocks)

        return {
            entities: beatenPathEntitySpecs.map((entitySpec: EntitySpec): Entity =>
                compileEntity(entitySpec, songSpec)),
            songId: SongID.BEATEN_PATH,
        }
    }

export {
    compileBeatenPathSong,
}
