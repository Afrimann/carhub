import { OptionProps } from '@/types';
import React from 'react';


interface CustomFilterProps {
  title: string;
  onChange: (value: string) => void;
  option: OptionProps[]
}

const CustomFilter: React.FC<CustomFilterProps> = ({ title, onChange,option }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };


  return (
    <select onChange={handleChange}>
      <option value="">{`Select ${title}`}</option>
      {/* Add more options dynamically based on the filter */}
      {
        option.map((option: any,index)=> (
          <option key={index} value={`${option}`} className={`relative select-none py-2 px-4 cursor-default`}>{option.value}</option>
        ))
      }
    </select>
  );
};

export default CustomFilter;
