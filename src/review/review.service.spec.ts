import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewService } from './review.service';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'test description',
	rating: 5,
	productId,
};

const reviewService = {
	findByProductId: (id: string) => [testDto],
};

describe('ReviewService', () => {
	let service: ReviewService;
	const mockFn = jest.fn();
	const reviewRepositoryFactory = () => ({
		find: mockFn,
	});
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,

				// first variant
				// {
				// 	useFactory: reviewRepositoryFactory,
				// 	provide: getModelToken('ReviewModel'),
				// },
			],
		})
			// second variant
			.overrideProvider(ReviewService)
			.useValue(reviewService)
			.compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId', async () => {
		const id = new Types.ObjectId().toHexString();

		// first variant
		// reviewRepositoryFactory().find.mockReturnValueOnce([testDto]);
		// const res = await service.findByProductId(id);

		// second variant
		const res = await service.findByProductId(id)

		expect(res?.[0]).toEqual(testDto);
	});
});
