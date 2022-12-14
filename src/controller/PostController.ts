import PostModel from '@/models/Post'
import { Request, Response } from 'express'
import { io } from '@/index'
import { handleError } from '@/utilities/Error'
export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await PostModel.find({})
    res.status(200).json({
        type: 'success',
        data: posts
    })
}
export const getPost = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        if (!post) {
            res.status(404).json({
                type: 'error',
                message: `Post with id ${id} not found!`
            })
            return
        }
        res.status(200).json({
            type: 'success',
            data: post
        })
    } catch (err: unknown) {
        handleError(res, err)
    }
}

export const createPost = async (req: Request, res: Response) => {
    const postData = req.body
    try {
        const post = await PostModel.create(postData)
        res.status(200).json({
            type: 'success',
            data: post
        })
        io.emit('new-post-created')
    } catch (err: unknown) {
        handleError(res, err)
    }
}

export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id
    const newPostData = req.body
    try {
        const newPost = await PostModel.findByIdAndUpdate(id, newPostData, {
            runValidators: true,
            new: true
        })
        res.status(200).json({
            type: 'success',
            data: newPost
        })
    } catch (err: unknown) {
        handleError(res, err)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await PostModel.findByIdAndRemove(id)
        res.status(200).json({
            type: 'success',
            message: `Post with id ${id} deleted successfully`
        })
    } catch (err: unknown) {
        handleError(res, err)
    }
}
