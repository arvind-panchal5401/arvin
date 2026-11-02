const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')




const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req, res) {




    const file = await imageKit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: '/cohort_2_0_insta_clone/img'

    })



    


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id

    })

    res.status(201).json({
        message: 'Post is created sucessfully',
        post
    })


}

async function getpostController(req, res) {


    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: 'post featch sucessfully',
        posts
    })

}

async function getpostdeatilsController(req, res) {

    
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'post not found.'

        })
    }

    const isVaildUser = post.user.toString() == userId

    if (!isVaildUser) {
        return res.status(403).json({
            message: 'Forbidden Content'
        })
    }
    return res.status(201).json({
        message: 'post fetched sucessfully',
        post
    })
}



module.exports = {
    createpostController,
    getpostController, getpostdeatilsController

}