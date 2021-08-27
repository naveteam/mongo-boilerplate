import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Types } from 'mongoose'

import User from 'models/User'

import {
  Unauthorized,
  encryptPassword,
  sendEmail,
  NotFound,
  generateTokens,
  refreshOAuthToken,
  getPaginationData,
  userQueue
} from 'helpers'

import { templateForgetPassword } from 'utils'

export const login = async ctx => {
  const { body } = ctx.request

  const user = await User.findOne({ email: body.email }).populate('role')

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, password is invalid')
  }

  const parsedUser = user.toJSON()

  return {
    ...parsedUser,
    ...generateTokens({
      id: parsedUser._id,
      role_id: parsedUser.role._id
    })
  }
}

export const index = async ctx => {
  const { orderBy, sort } = ctx.query

  const customLabels = {
    docs: 'users',
    totalDocs: 'page',
    totalPages: 'pageCount'
  }

  const { limit, offset } = getPaginationData(ctx.query)

  return User.paginate(
    {},
    { offset, limit, customLabels, sort: { [sort]: orderBy === 'asc' ? 1 : -1 } }
  )
}

export const forget = async ctx => {
  const { body } = ctx.request
  const token = crypto.randomBytes(10).toString('hex')

  const user = await User.findOneAndUpdate(
    { email: body.email },
    {
      password_reset_token: token
    }
  )

  if (!user) {
    throw new NotFound('User not found')
  }

  const template = templateForgetPassword(token)

  await sendEmail(body.email, template)

  return { email: body.email }
}

export const reset = async ctx => {
  const { token, password } = ctx.request.body

  const newPassword = await encryptPassword(password)

  const user = await User.findOneAndUpdate(
    {
      password_reset_token: token
    },
    {
      password: newPassword,
      password_reset_token: null,
    }
  )

  if (!user) {
    throw new NotFound('User not found')
  }

  return user
}

export const show = ctx =>
  User.findOne({ id: ctx.params.id })
    .populate('role')

export const create = async ctx => {
  const { body } = ctx.request
return User.create({
    name: body.name,
    password: await encryptPassword(body.password),
    email: body.email,
    gender: body.gender,
    role: Types.ObjectId(body.role),
    birthdate: body.birthdate
  })
}

export const update = async ctx => {
  const { body } = ctx.request
  return User.findByIdAndUpdate(ctx.state.user.id, {
    name: body.name,
    email: body.email,
    gender: body.gender,
    role: Types.ObjectId(body.role),
    birthdate: body.birthdate
  })
}

export const destroy = async ctx => {
  const user = await User.findByIdAndDelete(ctx.state.user.id)
  if (!user) {
    throw new NotFound('User not found')
  }

  return user
}

export const me = ctx => User.findOne({ id: ctx.state.user.id })

export const refreshToken = ctx => {
  const { body } = ctx.request

  return refreshOAuthToken(body).catch(() => {
    throw Unauthorized('Invalid refresh token')
  })
}

export const createUsingQueue = ctx => {
  const { body } = ctx.request

  userQueue.queue.add(body)

  return { message: 'Job is running' }
}

export default {
  index,
  create,
  login,
  forget,
  reset,
  update,
  show,
  destroy,
  me,
  refreshToken,
  createUsingQueue
}
