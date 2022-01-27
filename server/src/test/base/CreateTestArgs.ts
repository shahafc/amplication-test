import { ArgsType, Field } from "@nestjs/graphql";
import { TestCreateInput } from "./TestCreateInput";

@ArgsType()
class CreateTestArgs {
  @Field(() => TestCreateInput, { nullable: false })
  data!: TestCreateInput;
}

export { CreateTestArgs };
