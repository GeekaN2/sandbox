import React from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../store';
import { Block } from '../store';
import { getSnapshot, Instance, ModelSnapshotType, SnapshotOrInstance } from 'mobx-state-tree';

export const Form: React.FC = observer(() => {
    const { blocks } = formStore;

    const formViewer = (block: Instance<typeof Block>) => {
        if (block.blockType === 'input') {
            return (
                <input 
                    type="text" 
                    value={block.value} 
                    onChange={(event) => block.onChange(event.target.value)}
                />
            )
        }

        if (block.blockType === 'checkbox') {
            return (
                <>
                    {block.options.map(({ label, value }) => (
                        <label>
                            <input
                                type="checkbox"
                                checked={block.value.includes(value)}
                                onClick={() => {
                                    block.toggleValue(value)
                                }}>
                            </input>
                            {label}
                        </label>
                    ))}
                </>
            )
        }
    }

    const blockViews: React.ReactNode[] = [];

    for (let blockIndex = 0; blockIndex < getSnapshot(blocks).length; blockIndex++) {
        blockViews.push(formViewer(blocks[blockIndex]));
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '300px',
            padding: '20px'
        }}>
            {blockViews}
            <button onClick={() => formStore.save()}>Save</button>
        </div>
    )
})