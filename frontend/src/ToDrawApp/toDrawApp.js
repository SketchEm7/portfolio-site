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
            <div>
                <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>ToDraw App</h1>
                    <p className="header-text desktop-containers-text">This is a to-do app with a specialized theme of drawing. It's a to-draw app. For each entry in the list the user may include a title, a description, a color palette, and a reference photo in preperation for a drawing. </p>
                    <h3 className="header-text desktop-containers-text">Technologies Used</h3>
                    <div className="tech-used-box desktop-containers-text">
                        <div className="tech-logos-box">

                        </div>
                    </div>
                </div>
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
            </div>
        )

   }
}

export default ToDrawApp
