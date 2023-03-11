import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsNumber()
	@Max(5, { message: 'Rating should be less than 6'})
	@Min(1, { message: 'Rating should be more than 0'})
	rating: number;

	@IsString()
	productId: string;
}
