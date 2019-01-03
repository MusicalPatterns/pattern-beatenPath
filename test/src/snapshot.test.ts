import { compilePattern } from '@musical-patterns/compiler'
import { Pattern } from '@musical-patterns/pattern'
// @ts-ignore
import { collectPatternNames } from '../../bin'

describe('snapshot', () => {
    it('stays locked down', async (done: DoneFn) => {
        // tslint:disable-next-line:no-var-requires no-require-imports no-unsafe-any
        const pattern: Pattern = require('../../src/indexForTest').pattern

        expect(JSON.stringify(await compilePattern(pattern), undefined, 2))
        // tslint:disable-next-line:no-require-imports no-unsafe-any
            .toEqual(JSON.stringify(require('../../src/snapshot'), undefined, 2))

        done()
    })
})
