import { Dispatch } from 'redux'
import { DECIMAL } from '../../../src/constants'
import { ActionType } from '../../../src/interface/actions'
import { Config, Song } from '../../../src/songTypes'
import { Core } from './types'
import * as to from './utilities/to'

const beatenPathHandleConfigChange: (dispatch: Dispatch, configKey: string, configValue: string, song: Song) => void =
    (dispatch: Dispatch, configKey: string, configValue: string, song: Song): void => {
        let configChanges: {[index: string]: number | Core} = {}
        if (configKey === 'core') {
            const newCore: Core = to.Core(parseInt(configValue, DECIMAL) || 0)
            configChanges =  { core: newCore }
        }
        else {
            configChanges = { [configKey]: parseInt(configValue, DECIMAL) }
        }

        const updatedConfig: Config = { ...song.config, ...configChanges }
        const newSong: Song = { ...song, config: updatedConfig }

        dispatch({ type: ActionType.SET_SONG, data: newSong })
    }

export {
    beatenPathHandleConfigChange,
}
