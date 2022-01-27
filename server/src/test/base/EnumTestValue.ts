import { registerEnumType } from "@nestjs/graphql";

export enum EnumTestValue {
  Temp_1 = "Temp_1",
  Temp_2 = "Temp_2",
  Temp_3 = "Temp_3",
}

registerEnumType(EnumTestValue, {
  name: "EnumTestValue",
});
