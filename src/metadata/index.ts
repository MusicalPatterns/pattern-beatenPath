// tslint:disable-next-line:no-import-side-effect
import './html.d.ts'

let post: string
try {
    // tslint:disable-next-line
    post = require('./post.html') || ''
}
catch (e) {
    post = ''
}

export {
    post,
}
