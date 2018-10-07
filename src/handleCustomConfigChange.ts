import { DECIMAL } from '../../../src/constants'
import { CustomConfig } from '../../../src/songTypes'
import { Core } from './types'
import * as to from './utilities/to'

const beatenPathHandleCustomConfigChange: (
    customConfigKey: string,
    customConfigValue: string,
) => Partial<CustomConfig> =
    (customConfigKey: string, customConfigValue: string): Partial<CustomConfig> => {
        const newCore: Core = to.Core(parseInt(customConfigValue, DECIMAL) || 0)

        return {
            core: newCore,
        }
    }

export {
    beatenPathHandleCustomConfigChange,
}
