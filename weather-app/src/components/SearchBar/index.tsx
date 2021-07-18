import * as React from 'react'
import { Location } from '../../types'
import SearchField from "react-search-field";


export interface SearchBarProps {
    onSearchClick: (location : Location) => void;
}


export  function SearchBar({ onSearchClick }: SearchBarProps): React.ReactElement {


    return (
        <SearchField 
            placeholder="Enter location.." 
            onSearchClick={onSearchClick} 
            onEnter={onSearchClick} 
        />
    )
}

export default SearchBar
