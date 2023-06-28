import React from "react"
import SelectInput from "../common/SelectInput"
import TextInput from "../common/TextInput";
const PrintForm = ({onSave, onColorChange, onDescriptionChange, print, colors, saving = false, errors = {}}) => {
    return (
        <form onSubmit={onSave}>
            <h2>{print.id ? "Edit" : "Add"} 3D Print</h2>
            <SelectInput
                name="color"
                label="Color"
                defaultOption="Select a Color"
                options={colors}
                value={print.color}
                onChange={onColorChange}
                error={errors.color}
            ></SelectInput>
            <TextInput
                name="description"
                label="Description"
                value={print.description}
                onChange={onDescriptionChange}
                error={errors.description}
            ></TextInput>

            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default PrintForm