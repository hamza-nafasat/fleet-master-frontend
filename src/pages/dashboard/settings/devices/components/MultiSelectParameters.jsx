/* eslint-disable react/prop-types */
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// eslint-disable-next-line react/prop-types
export default function MultiSelectParameters({ selectedParameters, setSelectedParameters, parameters }) {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={parameters}
      disableCloseOnSelect
      value={selectedParameters}
      onChange={(event, value) => setSelectedParameters(value)}
      getOptionLabel={(option) => option.parameter}
      renderOption={(props, option, { selected }) => {
        console.log("selected", selected);
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selectedParameters?.some((p) => p.parameter === option.parameter)}
            />
            {option.parameter}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Parameters" placeholder="Select parameters" />}
    />
  );
}
