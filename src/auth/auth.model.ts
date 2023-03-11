import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AuthModel {
	@Prop({ unique: true })
	email: string;

	@Prop()
	hashPassword: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
