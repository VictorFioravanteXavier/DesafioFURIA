exports.middlewareGlobal = function (req, res, next) {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user;
    next()
}

exports.seuOutroMiddleware = function (req, res, next) {
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404')
    }
}

exports.csrfMidlleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}
