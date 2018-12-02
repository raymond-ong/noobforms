import React from 'react'
import NoobSection from './noobSection';

const NoobSectionList = ({sections, resizingControlId,
                        onSelectControl, onResizerMouseDown, onSectionMouseUp, onControlTypeSelected}) => (
    <div className='designer'>
        {sections.map(section => 
            <NoobSection
                key={'sect' + section.sectId}
                {...section}
                resizingControlId = {resizingControlId}
                onSelectControl = {onSelectControl}
                onResizerMouseDown = {onResizerMouseDown}
                onSectionMouseUp = {onSectionMouseUp}
                onControlTypeSelected = {onControlTypeSelected}
            />) 
        }
    </div>
)

export default NoobSectionList;