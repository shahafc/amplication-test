import * as React from "react";
import { Create, SimpleForm, CreateProps, SelectInput } from "react-admin";

export const TestCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <SelectInput
          source="value"
          label="value"
          choices={[
            { label: "Temp 1", value: "Temp_1" },
            { label: "Temp 2", value: "Temp_2" },
            { label: "Temp 3", value: "Temp_3" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
      </SimpleForm>
    </Create>
  );
};
