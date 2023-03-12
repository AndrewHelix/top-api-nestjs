import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/idValidation.pipe';
import { CreateProductDto } from './dto/create.product.dto';
import { FindProductDto } from './dto/find.product.dto';
import { ProductError } from './product.constats';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(ProductError.PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.deleteById(id);
		if (!product) {
			throw new NotFoundException(ProductError.PRODUCT_NOT_FOUND);
		}

		return { message: 'product deleted' };
	}

	@Patch(':id')
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ProductModel,
	) {
		const product = await this.productService.updateById(id, dto);
		if (!product) {
			throw new NotFoundException(ProductError.PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
