import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create.review.dto';
import { Types } from 'mongoose';
import { ReviewErrors } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'test description',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		return await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		return await request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body: [result] }: request.Response) => {
				expect(result.name).toEqual(testDto.name);
				expect(result.title).toEqual(testDto.title);
				expect(result.description).toEqual(testDto.description);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return await request(app.getHttpServer())
			.get('/review/byProduct/' + 'invalid product id')
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/delete (DELETE) - success', async () => {
		return await request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200)
			.expect({ message: 'document deleted' });
	});

	it('/review/delete (DELETE) - fail', async () => {
		return await request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(404, {
				statusCode: 404,
				message: ReviewErrors.NOT_FOUND,
			});
	});
});
