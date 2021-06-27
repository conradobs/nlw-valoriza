import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRespositories"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories)

    // Verificar se email existe
    const user = await userRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password Incorrect')
    }
    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password Incorrect')
    }
    // Gerar Token
    const token = sign({
      email: user.email
    }, '223dd8fa5273eefebd9078ccd2542dec', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateUserService }