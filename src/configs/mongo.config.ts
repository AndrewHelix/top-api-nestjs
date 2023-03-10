import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	return {
		uri: configService.get('MONGO_URI'),
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
};
