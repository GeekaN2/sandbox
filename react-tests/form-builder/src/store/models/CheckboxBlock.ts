import { types } from "mobx-state-tree";

export const CheckboxOption = types.model({
    label: types.string,
    value: types.string,
})

export const CheckboxBlock = types.model({
    id: types.string,
    blockType: types.literal('checkbox'),
    value: types.array(types.string),
    options: types.array(CheckboxOption),
}).actions(self => ({
    toggleValue(value: string) {
        if (self.value.includes(value)) {
            self.value.splice(self.value.indexOf(value), 1);
        } else {
            self.value.push(value);
        }
    }
}));