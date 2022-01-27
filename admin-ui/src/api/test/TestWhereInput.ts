import { StringFilter } from "../../util/StringFilter";

export type TestWhereInput = {
  id?: StringFilter;
  value?: "Temp_1" | "Temp_2" | "Temp_3";
};
