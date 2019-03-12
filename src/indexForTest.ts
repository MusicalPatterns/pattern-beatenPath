// tslint:disable no-reaching-imports

export {
    computeSegments,
    materializeEntities,
    computeNotes,
    computeFractionsAndScalars,
    computeFirstEntityScalarIndex,
    computeSecondEntityScalarIndex,
    FractionsAndScalars,
    BeatenPathEntity,
    BeatenPathEntityNotes,
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpecs,
    BeatenPathStyle,
    spec,
} from './spec/indexForTest'

export { to, from, Core } from './nominals'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
