import { ArgsType, Field } from "@nestjs/graphql";
import { TestWhereUniqueInput } from "./TestWhereUniqueInput";
import { TestUpdateInput } from "./TestUpdateInput";

@ArgsType()
class UpdateTestArgs {
  @Field(() => TestWhereUniqueInput, { nullable: false })
  where!: TestWhereUniqueInput;
  @Field(() => TestUpdateInput, { nullable: false })
  data!: TestUpdateInput;
}

export { UpdateTestArgs };
