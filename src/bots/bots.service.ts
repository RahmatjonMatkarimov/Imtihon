import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './entities/bot.entity';
import { Op } from 'sequelize';

@Injectable()
export class BotsService implements OnModuleInit {
  private bot: TelegramBot
  constructor(@InjectModel(Bot) private botModel: typeof Bot) { }

  async requests(
    page = 1,
    pageSize = 10,
    search?: string,
  ) {
    const offset = (page - 1) * pageSize;
    const where = search
      ? {
        name: {
          [Op.iLike]: `%${search}%`, 
        },
      }
      : {};

    const { rows, count } = await this.botModel.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }


  onModuleInit() {
    const token = process.env.BOT_TOKEN
    this.bot = new TelegramBot(token as string, { polling: true })

    this.bot.on('message', async (msg) => {
      try {
        const chatId = msg.chat.id
        const fullName = `${msg.from?.first_name} ${msg.from?.last_name || ''}`.trim()
        const text = msg.text

        if (!text) return

        if (text === '/start') {
          this.bot.sendMessage(chatId, `Assalomu aleykum ${fullName}, Iltimos murojaatingizni qoldiring.`)
          return
        }

        await this.botModel.create({
          chatId,
          fullName,
          message: text,
        })

        this.bot.sendMessage(chatId, `Murojaatingiz adminlarga yuborildi`)
      } catch (error) {
        console.error(error)
      }
    });
  }
}
