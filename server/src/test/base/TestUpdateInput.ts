import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumTestValue } from "./EnumTestValue";
import { IsEnum, IsOptional } from "class-validator";
@InputType()
class TestUpdateInput {
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
export { TestUpdateInput };
