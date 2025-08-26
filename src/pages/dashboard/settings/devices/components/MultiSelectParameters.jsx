/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelectParameters({ selectedParameters, setSelectedParameters, parameters }) {
  console.log("parameters", parameters);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={parameters}
      disableCloseOnSelect
      value={selectedParameters}
      onChange={(event, value) => setSelectedParameters(value)}
      // ✅ If object has parameter → show it, else use name
      getOptionLabel={(option) => option.parameter || option.name || ""}
      // ✅ Compare either by parameter text OR _id if available
      isOptionEqualToValue={(option, value) =>
        option._id ? option._id === value._id : option.parameter === value.parameter
      }
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.parameter || option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select" placeholder="Choose option(s)" />
      )}
    />
  );
}
