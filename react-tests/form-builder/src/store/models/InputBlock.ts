import { types } from "mobx-state-tree";

export const InputBlock = types.model({
    id: types.string,
    blockType: types.literal('input'),
    value: types.string,
    placeholder: types.string,
}).actions(self => ({
    onChange(newValue: string) {
        self.value = newValue;
    }
}));
