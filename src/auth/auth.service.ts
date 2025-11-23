import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto, registerDto, resetPasswordDto, verifyDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahmatjon974@gmail.com",
      pass: process.env.APP_PASS
    }
  })
  constructor(@InjectModel(Auth) private authModel: typeof Auth, private jwtService: JwtService) { }

  async register(data: registerDto) {
    const { email, username, password } = data
    const user = await this.authModel.findOne({ where: { email } })

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
      subject: "CRM tizimi",
      html: `<b>tasdiqlash kodi: ${otp}</b>`
    });

    return { message: "emailga tasdiqlash codi yuborildi", otp };
  }

  async login(data: loginDto) {
    const { email, password } = data;
    const user = await this.authModel.findOne({ where: { email } });

    if (!user || !user.dataValues.password) throw new BadRequestException("Email yoki parol noto‘g‘ri")
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) throw new BadRequestException("Email yoki parol noto‘g‘ri")
    if (!user.dataValues.isVerify) throw new BadRequestException("Email hali tasdiqlanmagan")

    const token = this.jwtService.sign({
      id: user.dataValues.id,
      email: user.dataValues.email,
      role: user.dataValues.role
    });

    return {
      token,
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
        role: user.dataValues.role
      }
    };
  }

  async verify(data: verifyDto) {
    const { email, otp } = data;

    const user = await this.authModel.findOne({ where: { email } })
    if (!user) throw new BadRequestException("Foydalanuvchi topilmadi")
    if (otp !== user.dataValues.otp) throw new BadRequestException("OTP noto'g'ri")
    if (Date.now() > Number(user.dataValues.otp_time)) throw new BadRequestException("OTP muddati tugagan")

    await user.update({
      isVerify: true,
      otp: null,
      otp_time: null
    });

    return {
      message: "Tasdiqlash muvaffaqqiyatli bajarildi",
    };
  }

  async reset_password(data: resetPasswordDto) {
    const { email, password } = data;
    const user = await this.authModel.findOne({ where: { email } });
    if (!user) throw new BadRequestException("Foydalanuvchi topilmadi");
    const hashedPassword = await bcrypt.hash(password, 12);
    await user.update({ password: hashedPassword });
    return { message: "Parol muvaffaqiyatli yangilandi" };
  }

}
