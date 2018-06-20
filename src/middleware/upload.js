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

                if (file) {
                    file.thumb = cloudinary.url(file.public_id, {
                        secure: true,
                        width: 150,
                        height: 150,
                        crop: 'thumb'
                    })
                }
                files.push(file)
            }))
            res.locals.files = files
            next()
        })
    }
}
