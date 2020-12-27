import React from 'react';

const Filter = props => {
    const { genres, genreFilter, textProperty, valueProperty, selectedItem } = props;

    return (
        <ul className="list-group">
            {genres.map(genre => {
                return <li className={ genre.name === selectedItem.name
                    ? "list-group-item active" : "list-group-item"}
                    key={genre[valueProperty]}
                    onClick={() => {genreFilter(genre)}}
                    style={{cursor: "pointer"}}>
                        {genre[textProperty]}
                    </li>;
            })}
        </ul>
    );
}

Filter.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default Filter;
