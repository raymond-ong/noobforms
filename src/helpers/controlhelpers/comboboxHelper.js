import React from 'react';
import '../../styles/labelHelper.css';
import { Dropdown } from 'semantic-ui-react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
//import Select from 'react-select'
import { Input } from 'semantic-ui-react';
import {getToolItem} from '../../components/toolbox';


const DEFAULT_LABEL = 'Combobox';

const friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
  },
  {
    text: 'Apple',
    value: 'Apple',
  },
  {
    text: 'Banana',
    value: 'Banana',
  },
  {
    text: 'Carrots',
    value: 'Carrots',
  },
  {
    text: 'Dwight "The Superman" Howard',
    value: 'Dwight',
  },
]

// Using semantic ui dropdown:
// Prob: Font size too big
export function renderCombobox(label) {
    if (!label) {
        label = DEFAULT_LABEL;
    }

    var style={
        'marginRight': '5px',
        'marginTop': '0px',
        'marginBottom': '5px',
        'width': 'calc(100% - 5px)'
    };

    return (<div className="comboboxContainer">        
        <label className="controlLabel">{label}:            
        </label>
        <Dropdown placeholder='Select Friend' 
                        size='tiny' 
                        fluid 
                        multiple
                        search
                        selection
                        style={style}
                        options={friendOptions} />
    </div>);
}
   
// Using Rc-select    
// Prob: Drag image is not shown
export function renderComboboxRc(label) {
    if (!label) {
        label = DEFAULT_LABEL;
    }
    // use this instead of wrapping it inside our container
    var style={
        'marginRight': '5px',
        'marginTop': '0px',
        'marginBottom': '5px',
        'padding': '0px',
        'width': 'calc(100% - 5px)'
    }; 

    const dropdownMenuStyle = {
        maxHeight: 200,
      };

    return <div className="textboxContainer">        
        <label className="controlLabel">{label}:            
        </label>
        
        <Select
        choiceTransitionName="rc-select-selection__choice-zoom"
        dropdownMenuStyle={dropdownMenuStyle}
          multiple
          allowClear={false}
          style={style}
          placeholder="Please select"
          tokenSeparators={[' ', ',']}
          optionFilterProp="children"
          optionLabelProp="children"
          tokenSeparators={[' ', ',']}
        >
          <Option value="apple">
            <b style={{ color: 'red' }}>Apple</b>
          </Option>
          <Option value="banana">Banana The quick brown fox jumps over the lazy dog</Option>
          <Option value="carrot" disabled>Carrot</Option>
          <Option value="dolphin">Dolphin</Option>
          <Option value="elephant">Elephant</Option>
          <Option value="ferrari">Ferrari</Option>
        </Select>

        {/* <Select options={options} /> */}
    </div>
}

export function renderControlProps(control) {
    return <div>
        <label className="controlLabel">Name:
        </label>
        <Input size='mini' fluid value={control.name}>
        </Input>

        <label className="controlLabel">Label:
        </label>
        <Input size='mini' fluid value={control.label}>
        </Input>
    </div>
}
