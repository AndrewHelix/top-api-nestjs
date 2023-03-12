import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') {
			return value;
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException('invalid id');
		}

		return value;
	}
}
