import React from 'react';

import Select, { components } from 'react-select';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement(props => {
  
  const onMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle(props => (
  <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);

 const MultiSelectSort = ({data, setDemande})=> {
     console.log(data);
     const [options, setOptions] = React.useState([]);
     React.useEffect(() => {
        let a = data.map(el=>{
            return {value: el.label, label: el.label}
        })
        setOptions(a)
     }, [])
  

  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
      console.log(selected);
      let s= selected.map(el=>{
        let x = data.filter(val=> val.label === el.label)
        return x[0]
      })
      setDemande(s)
  }, [selected])
  const onChange = selectedOptions => setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      'Values sorted:',
      newValue.map(i => i.value)
    );
  };

  return (
    <SortableSelect
      useDragHandle

      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}

      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      
      isMulti
      options={options}
      value={selected}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue,
        MultiValueLabel: SortableMultiValueLabel,
      }}
      closeMenuOnSelect={false}
    />
  );
}

export default MultiSelectSort