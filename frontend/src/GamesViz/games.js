import React, { Component }  from 'react';
import axios from 'axios';
import Loader from '../GlobalComponents/Loader';
import Description from './Components/Description';
import NameAndSort from './Components/NameAndSort';
import Chart from './Components/CreateBarChart';
import GameModal from './Components/GameModal';
import PrivateProfileWarning from './Components/PrivateProfileWarning';
import createReduxStore from './redux/createReduxStore';

const store = createReduxStore();

class SteamGamesBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playedGames: null,
            steamId: null,
            personName: null,
            avatarMedium: null,
            appId:null,
            gameLogoHash:null,
            sortOrder: "greatestToLeast",
            loading: null,
            openModal: false,
        };
    }


    async componentDidMount() {
        this.setState({
            loading: true
        });
        const gamesResponse = await axios.get(`/api/games`);
        this.setState({
            playedGames: gamesResponse.data.games.filter(game => game.playtime_forever > 1),
            steamId: '76561198085130667',
            personName: gamesResponse.data.name,
            avatarMedium: gamesResponse.data.avatarmedium,
            loading: false,
        });
        // window.addEventListener("resize", this.windowResized.bind(this));
        this.loadSteamId();
    }

    // windowResized() {
    //     this.createBarChart();
    // }

    close = () => {
        this.setState({
            openModal: false,
        })
    };

    gameClicked =  async (title, appId) => {
        const gameExtras = await axios.get(`/api/game-extras/${title}`);
        const gameNewsResponse = await axios.get(`api/game-news/${appId}`);

        this.setState({
            openModal: !this.state.openModal,
            gameTitle: title,
            gameSummary: gameExtras['data']['summary'],
            gameCover: gameExtras['data']['cover'],
            gameNewsResponse: gameNewsResponse && gameNewsResponse.data.appnews.newsitems.map((title) => title['title']),
            gameNewsLink:  gameNewsResponse && gameNewsResponse.data.appnews.newsitems.map((title) => title['url']),
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    handleSortOrderChange = (event, {value}) => {
        this.setState({
            sortOrder: value
        });
    };


    loadSteamId = async () => {
        const gamesResponse = await axios.get(`/api/games?steam_id=${ this.state.steamId }`);
        if (gamesResponse.data) {
            this.setState({
                playedGames: gamesResponse.data.games && gamesResponse.data.games.filter(game => game.playtime_forever > 1),
                personName: gamesResponse.data.name,
                avatarMedium: gamesResponse.data.avatarmedium,
            });
        }

    };



    render() {
        const gamesSVG = <div>
            <Chart playedGames={this.state.playedGames}
                   sortOrder={this.state.sortOrder}
                   callbackFromParent={this.gameClicked}/>
        </div>;

        let playedGamesContent = null;
        if (this.state.playedGames) {
            playedGamesContent = gamesSVG;
        } else {
            playedGamesContent = <PrivateProfileWarning/>;
        }

        const DisplaySort = this.state.playedGames ?
                            <NameAndSort appId={this.state.appId}
                                         avatarMedium={this.state.avatarMedium}
                                         personName={this.state.personName}
                                         handleSortOrderChange={this.handleSortOrderChange}/> : null;

        return (<div>
                    {this.state.loading ? <Loader/> :  <Description handleChange={this.handleChange("steamId")} loadSteamId={this.loadSteamId}/>}
                    {this.state.openModal ?
                        <GameModal openModal={this.state.openModal}
                                   gameTitle={this.state.gameTitle}
                                   gameCover={this.state.gameCover}
                                   gameSummary={this.state.gameSummary}
                                   gameNewsResponse={this.state.gameNewsResponse}
                                   gameNewsLink={this.state.gameNewsLink}
                                   closeClick={this.close}/>: null}
                    {DisplaySort}
                    {playedGamesContent}
                </div>
               );
    }
}

export default SteamGamesBarChart;