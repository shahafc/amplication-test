import * as React from "react";
import { Edit, SimpleForm, EditProps, SelectInput } from "react-admin";

export const TestEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
