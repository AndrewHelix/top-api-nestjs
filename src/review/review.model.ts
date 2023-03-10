import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;
	
	@Prop()
	description: string;
	
	@Prop()
	rating: string;
	
	@Prop()
	createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
