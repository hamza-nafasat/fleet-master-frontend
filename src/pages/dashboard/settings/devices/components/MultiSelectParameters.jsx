import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// eslint-disable-next-line react/prop-types
export default function MultiSelectParameters({setSelectedParameters, parameters}) {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={parameters}
      disableCloseOnSelect
      onChange={(event, value) => setSelectedParameters(value)}
      getOptionLabel={(option) => option.parameter}
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
            {option.parameter}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Parameters"
          placeholder="Select parameters"
        />
      )}
    />
  );
}
