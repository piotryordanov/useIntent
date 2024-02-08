import { MenuItem } from '@blueprintjs/core';
import { FocusStyleManager } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import Fuse from 'fuse.js';
// @ts-expect-error
import * as R from 'ramda';
import React, { useState } from 'react';

FocusStyleManager.onlyShowFocusOnTabs();

const filterItems = (query: any, items: any) => {
  const fuse = new Fuse(items, {
    keys: ['full_name'],
    includeScore: true,
    threshold: 0.3,
  });

  if (query == '') return items;
  const result = fuse.search(query);
  return result.map((r) => r.item);
};

const renderItem = (
  item: any,
  selectedValue: any,
  { handleClick, handleFocus, modifiers }: any
) => {
  return (
    <MenuItem
      active={selectedValue.name == item.name}
      key={item.rank}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure='listoption'
      text={R.propOr(item.title, 'full_name', item)}
    />
  );
};

const MainSelect = (props: any) => {
  const default_data = props.default_data.map((item: any, index: number) => {
    item.index = index;
    return item;
  });

  const value = props.selectedValue ? props.selectedValue : 0;
  const [selectedValue, setSelectedValue] = useState(
    value == -1 ? { title: 'asd', icon: '', intent: '' } : default_data[value]
  );

  return (
    <Select
      items={default_data}
      itemListPredicate={filterItems}
      itemRenderer={(item, props) => renderItem(item, selectedValue, props)}
      noResults={
        <MenuItem
          disabled={true}
          text='No results.'
          roleStructure='listoption'
        />
      }
      onItemSelect={(value, index) => {
        if (props.onItemSelect) {
          props.onItemSelect(value);
        }
        setSelectedValue(value);
      }}
      className='bp5-dark'
    >
      {props.children}
    </Select>
  );
};

export default MainSelect;
