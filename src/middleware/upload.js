import multiparty from 'multiparty'

export default function defineUploadMiddleware(req, res, next) {

    wrap().catch(err => next(err))

    async function wrap() {
        const cloudinary = req.app.get('cloudinary')
        const form = new multiparty.Form()

        const filePaths = []

        form.parse(req, async (err, fields, rawFiles) => {
            console.log(err, fields)
            if (err) {
                return next(err)
            }

            Object.values(rawFiles).forEach((file) => {
                filePaths.push(file[0].path)
            })

            const files = []
            await Promise.all(filePaths.map(async (filePath) => {
                const file = await cloudinary.uploader.upload(filePath)
                files.push(file)
            }))

            res.locals.files = files
            next()
        })
    }
}
