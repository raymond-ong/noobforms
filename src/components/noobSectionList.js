import React from 'react'
import NoobSection from './noobSection';

const NoobSectionList = ({sections, resizingControlId,
                        onSelectControl, onResizerMouseDown, onSectionMouseUp, onSectionMouseMove}) => (
    <div>
        {sections.map(section => 
            <NoobSection
                key={'sect' + section.sectId}
                {...section}
                resizingControlId = {resizingControlId}
                onSelectControl = {onSelectControl}
                onResizerMouseDown = {onResizerMouseDown}
                onSectionMouseUp = {onSectionMouseUp}
                onSectionMouseMove = {onSectionMouseMove}
            />) 
        }
    </div>
)

export default NoobSectionList;