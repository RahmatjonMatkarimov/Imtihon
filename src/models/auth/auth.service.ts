import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth, private jwtService: JwtService) { }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.authModel.findOne({
      where: { email },
    });

    if (!user) throw new BadRequestException("Email yoki parol notogri")
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) throw new BadRequestException("Email yoki parol notogri")

    const token = this.jwtService.sign({
      id: user.dataValues.user_id,
      email: user.dataValues.email,
      role: user.dataValues.role
    });

    return {
      token,
      user: {
        id: user.dataValues.user_id,
        email: user.dataValues.email,
        username: user.dataValues.username,
        role: user.dataValues.role
      }
    };
  }
}
