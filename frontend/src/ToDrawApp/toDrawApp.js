import React, {Component} from 'react';
import styles from "./toDrawApp.module.scss";
import cx from 'classnames';
import { ChromePicker } from 'react-color';

class ToDrawApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            term: '',
            items: [],
        }
    }

    onChange = (event)=> {
        this.setState({term:event.target.value});
    };

    onSubmit = (event)=> {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term],
        });
    };



   render() {
       const List = props => (
           <div>
               <ul>
                   {
                       props.items.map((item, index) =>
                           <React.Fragment>
                               <hr/>
                               <li key={index} className={styles.item}>{item}</li>
                           </React.Fragment>)
                   }
               </ul>
           </div>
       );

        return(
            <div className={styles.list}>
                <form onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onChange}/>
                    <div>Palette here:
                        <ChromePicker/>
                    </div>
                    <button>Submit</button>
                </form>
                <List items={this.state.items} />
            </div>
        )

   }
}

export default ToDrawApp