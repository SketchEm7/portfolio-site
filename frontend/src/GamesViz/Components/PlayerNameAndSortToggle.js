import React from 'react'
import cx from 'classnames';

const SortOrderOptions = [
    { key: 1, text: 'Most played to least played', value: 'greatestToLeast' },
    { key: 2, text: 'Least played to most played', value: 'leastToGreatest' },
];

export default (props) => (

    <div className={styles['personName-container']}>
        <span>{props.appId} <img src={props.avatarMedium}/></span><h1 className={cx(styles.personName)}>{props.personName}'s Steam Games Stats</h1>
        <div className={styles.dropdownContainer}>
            <Menu compact>
                <Dropdown text="Sort Order" options={SortOrderOptions} simple item onChange={this.handleSortOrderChange} />
            </Menu>
        </div>
    </div>
)