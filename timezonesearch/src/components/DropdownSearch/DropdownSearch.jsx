import './dropdownsearch.css';
import SearchIcon from '../icons/SearchIcon';
import DropDownSearchListItem from './DropdownSearchListItem';

const DropdownSearch = (props) => {  

  return (
    <div className="dropdown-search">
      <span>
        <SearchIcon />
      </span>
      <input
        className="dropdown-search__input"
        type="text"
        placeholder="Search"
        value={props.value}
        onChange={props.onChange}
      />
     <ul className="dropdown-search-list">
        {props.timezones.map((item) => (
          <DropDownSearchListItem key={item.country} item={item}/>
        ))}
      </ul>
    </div>
  );
};


export default DropdownSearch
