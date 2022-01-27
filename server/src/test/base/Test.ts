import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsEnum, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { EnumTestValue } from "./EnumTestValue";
@ObjectType()
class Test {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    enum: EnumTestValue,
  })
  @IsEnum(EnumTestValue)
  @IsOptional()
  @Field(() => EnumTestValue, {
    nullable: true,
  })
  value?: "Temp_1" | "Temp_2" | "Temp_3" | null;
}
export { Test };
