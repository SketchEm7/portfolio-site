import React, {Component} from 'react';
import styles from "./toDrawApp.module.scss";
import cx from 'classnames';
import { ChromePicker } from 'react-color';

class ToDrawApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            title: '',
            term: '',
            items: [],
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = (event)=> {
        event.preventDefault();
        this.setState({
            term: '',
            title: '',
            items: [...this.state.items,
                {
                    term: this.state.term,
                    title: this.state.title
                }],
        });
    };



   render() {
       const List = props => (
           <div>
               <ul>
                   {
                       props.items.map((item, index) =>
                           <React.Fragment key={index} >
                               <hr/>
                               <li className={styles.item}>
                                   <h3 className={styles.title}>{item.title.toUpperCase()}</h3>
                                   <p className={styles.description}>{item.term}</p>
                               </li>
                           </React.Fragment>)
                   }
               </ul>
           </div>
       );

        return(
            <div className={styles.list}>
                <form onSubmit={this.onSubmit}>
                    <span>Title</span>
                    <div>
                        <input className={styles.titleInput} aria-label={"title"} value={this.state.title} name="title" onChange={this.onChange}/>
                    </div>

                    <span>Description</span>
                    <input aria-label={"term"} value={this.state.term} name="term" onChange={this.onChange}/>
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