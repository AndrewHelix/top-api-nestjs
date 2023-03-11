import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	title: string;

	@Prop()
	category: string;

	@Prop({ type: () => HhData })
	hh?: HhData;

	@Prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop({ type: () => [String] })
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
