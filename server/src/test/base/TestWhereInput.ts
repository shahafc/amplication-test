import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, IsEnum } from "class-validator";
import { EnumTestValue } from "./EnumTestValue";
@InputType()
class TestWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    enum: EnumTestValue,
  })
  @IsEnum(EnumTestValue)
  @IsOptional()
  @Field(() => EnumTestValue, {
    nullable: true,
  })
  value?: "Temp_1" | "Temp_2" | "Temp_3";
}
export { TestWhereInput };
