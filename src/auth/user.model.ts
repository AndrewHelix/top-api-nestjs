import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserModel {
	@Prop({ unique: true })
	email: string;

	@Prop()
	hashPassword: string;
}

export const AuthSchema = SchemaFactory.createForClass(UserModel);
