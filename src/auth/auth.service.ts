import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserModel>,
	) {}
	async createUser(dto: AuthDto) {
		const salt = genSaltSync(7);
		const newUser = new this.userModel({
			email: dto.login,
			hashPassword: hashSync(dto.password, salt),
		});
		return await newUser.save();
	}

	async findUser(email: string) {
		return await this.userModel.findOne({ email });
	}
}
