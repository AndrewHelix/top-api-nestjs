import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	Res,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewErrors } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		const deletedDoc = await this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException(
				ReviewErrors.NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}

		return res.send({ message: 'document deleted' });
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
