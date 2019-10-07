import React, { Component }  from 'react';
import cx from 'classnames';
import styles from "../games.module.scss";
import { Image, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class GameModal extends Component {
    mapThisMess(){
        this.props.gameNewsResponse.map((news, index) =>
            [news, this.props.gameNewsLink[index]]
        );
    }

    render(){
        const { closeClick } = this.props;
        const latestNews = this.props.gameNewsLink ? <div>
            <hr/>
            <h3>Related News</h3>
            <ul>
                {this.props.gameNewsResponse.map((news, index) => {
                    return <a href={this.props.gameNewsLink[index]} target={"blank"} key={index} className={styles.gameLink}><li className={styles.gameLinkLi}>{news}</li></a>
                })}
            </ul>


        </div> : null;

        console.log(this.props.gameLink);
        return(

            <Modal open={this.props.openModal} closeIcon onClose={closeClick} closeOnDimmerClick={false}>
                <Modal.Header>{this.props.gameTitle}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.props.gameCover}  className={cx(styles.coverImage)}/>
                    <Modal.Description>
                        <div>
                            <p>
                            {this.props.gameSummary}
                            </p>

                            <br/>
                            <br/>
                        {latestNews}
                        </div>


                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }


}

export default GameModal;
//
// function mapStateToProps(reduxState) {
//     debugger;
//     console.log(reduxState);
//     return {
//         gameLetters: reduxState.openModal ,
//         gameTitle: reduxState.gameTitle,
//         gameCover: reduxState.gameCover,
//         gameSummary: reduxState.gameSummary,
//         gameNewsResponse: reduxState.gameNewsResponse,
//         close: reduxState.close,
//     };
// }
//
// GameModal.propTypes = {
//     openModal: PropTypes.arrayOf(PropTypes.string),
//     gameTitle: PropTypes.arrayOf(PropTypes.number),
//     gameCover: PropTypes.arrayOf(PropTypes.number),
//     gameSummary: PropTypes.arrayOf(PropTypes.number),
//     gameNewsResponse: PropTypes.arrayOf(PropTypes.number),
//     close: PropTypes.arrayOf(PropTypes.number),
//     dispatch: PropTypes.func
// }
//
// export default connect(mapStateToProps)(GameModal);