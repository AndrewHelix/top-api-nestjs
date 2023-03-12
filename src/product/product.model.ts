import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTimestampsConfig } from 'mongoose';
class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema({ timestamps: true })
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disadvantages: string;

	@Prop({ type: () => [String] })
	categories: string[];

	@Prop({ type: () => [String] })
	tags: string[];

	@Prop({ type: () => [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];
}

export type ProductDocument = ProductModel & Required<SchemaTimestampsConfig>;

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
