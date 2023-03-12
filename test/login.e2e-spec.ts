import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				login: 'email@example.com',
				password: '123',
			})
			.expect(200);
	});

	it('/auth/login (POST) - fail', async () => {
		return await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				login: 'email@example.com',
				password: 'invalid_password',
			})
			.expect(401);
	});
});
