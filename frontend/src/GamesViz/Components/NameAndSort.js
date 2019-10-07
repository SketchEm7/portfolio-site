import React, { Component }  from 'react';
import cx from 'classnames';
import styles from "../games.module.scss";
import { Dropdown, Menu } from 'semantic-ui-react';

const SortOrderOptions = [
    { key: 1, text: 'Most played to least played', value: 'greatestToLeast' },
    { key: 2, text: 'Least played to most played', value: 'leastToGreatest' },
];

class NameAndSort extends Component {

    render(){

        return(
            <div className={styles['personName-container']}>
                <span>{this.props.appId} <img src={this.props.avatarMedium}/></span><h1 className={cx(styles.personName)}>{this.props.personName}'s Stats</h1>
                <div className={styles.dropdownContainer}>
                    <Menu compact>
                        <Dropdown text="Sort Order" options={SortOrderOptions} simple item onChange={this.props.handleSortOrderChange} />
                    </Menu>
                </div>
            </div>
        )
    }
}

export default NameAndSort;