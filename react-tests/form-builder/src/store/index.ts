import { getSnapshot, types } from "mobx-state-tree";
import { CheckboxBlock } from "./models/CheckboxBlock";
import { InputBlock } from "./models/InputBlock";

export const Block = types.union(InputBlock, CheckboxBlock);

Block.create({
    id: 'input-first',
    blockType: 'input',
    value: '123',
    placeholder: '34',
});

Block.create({
    id: 'input-first',
    blockType: 'checkbox',
    value: ['123'],
    options: [{
        label: 'number',
        value: '123',
    }]
});

const FormStore = types.model({
    blocks: types.array(Block)
}).actions(self => ({
    render() {
        
    },

    save() {
        const blockValues = getSnapshot(self.blocks).map(block => ({
            [block.id]: block.value
        }));

        console.log(blockValues);
    }
}));

export const formStore = FormStore.create({
    blocks: [{
        id: 'alpha-input',
        blockType: 'input',
        value: '123',
        placeholder: '34',
    }, {
        id: 'beta-checkbox',
        blockType: 'checkbox',
        value: ['a'],
        options: [{
            label: 'first letter of the alphabet',
            value: 'a',
        },
        {
            label: 'second letter of the alphabet',
            value: 'b',
        }]
    }]
})