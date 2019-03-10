// tslint:disable no-reaching-imports

export {
    buildSegments,
    materializeEntities,
    buildNotes,
    buildFractionsAndScalars,
    calculateFirstEntityScalarIndex,
    calculateSecondEntityScalarIndex,
    FractionsAndScalars,
    BeatenPathEntity,
    BeatenPathEntityNotes,
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpec,
    BeatenPathStyle,
    data,
} from './spec/indexForTest'

export { to, from, Core } from './nominal'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
