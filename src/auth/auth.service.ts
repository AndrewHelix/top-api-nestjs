import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthErrors } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserModel>,
		private readonly jwtService: JwtService,
	) {}
	async createUser(dto: AuthDto) {
		const salt = await genSalt(7);
		const newUser = new this.userModel({
			email: dto.login,
			hashPassword: await hash(dto.password, salt),
		});
		return await newUser.save();
	}

	async findUser(email: string) {
		return await this.userModel.findOne({ email });
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new UnauthorizedException(AuthErrors.USER_NOT_FOUND);
		}

		const isCorrectPassword = await compare(password, user.hashPassword);

		if (!isCorrectPassword) {
			throw new UnauthorizedException(AuthErrors.WRONG_PASSWORD);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
