import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto, registerDto, resetPasswordDto, verifyDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer'

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahmatjon974@gmail.com",
      pass: process.env.APP_PASS
    }
  })
  constructor(@InjectModel(Auth) private authModel: typeof Auth) { }

  async register(data: registerDto) {
    const { email, username, password } = data
    const user = await this.authModel.findOne({
      where: {
        email
      }
    })

    if (user) throw new BadRequestException("foydalanuvchi allaqachon mavjud")

    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")
    const otp_time = Date.now() + 2 * 60 * 1000

    const newUser = {
      username,
      email,
      password: await bcrypt.hash(password, 12),
      role: "admin",
      otp,
      otp_time
    }

    await this.authModel.create(newUser)

    await this.transporter.sendMail({
      from: "rahmatjon974@gmail.com",
      to: email,
      subject: "crm",
      text: "tasdiqlash codi",
      html: `<b>${otp}</b>`
    })
    return { message: "emailga tasdiqlash codi yuborildi" };
  }
  login(data: loginDto) {
    return { message: "" };
  }
  verify(data: verifyDto) {
    return { message: "" };
  }
  reset_password(data: resetPasswordDto) {
    return { message: "" };
  }
}
