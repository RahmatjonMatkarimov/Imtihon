import { PartialType } from '@nestjs/swagger';
import { CreateLikesProductDto } from './create-likes-product.dto';

export class UpdateLikesProductDto extends PartialType(CreateLikesProductDto) {}
