import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';

import './fight.css'
import Arena from "../Arena/Index";

class Fight extends React.Component {
    state = {
        fighters: [],
        fighter1: null,
        fighter2: null,
        isFightStarted: false
    };

    async componentDidMount() {
        const fighters = await getFighters();
        if(fighters && !fighters.error) {
            this.setState({ fighters });
        }
    }

    onFightStart = () => {
        this.setState({isFightStarted: true})
    }

    onCreate = (fighter) => {
        this.setState({ fighters: [...this.state.fighters, fighter] });
    }

    onFighter1Select = (fighter1) => {
        this.setState({fighter1 });
    }

    onFighter2Select = (fighter2) => {
        this.setState({ fighter2 });
    }

    getFighter1List = () => {
        const { fighter2, fighters } = this.state;
        if(!fighter2) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter2.id);
    }

    getFighter2List = () => {
        const { fighter1, fighters } = this.state;
        if(!fighter1) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter1.id);
    }

    render() {
        const  { fighter1, fighter2, isFightStarted } = this.state;

        if(isFightStarted) return <Arena fighter1={fighter1} fighter2={fighter2} finishFight={() => this.setState({isFightStarted: false})}/>

        return (
            <div id="wrapper">
                <NewFighter onCreated={this.onCreate} />
                <div id="figh-wrapper">
                    <Fighter selectedFighter={fighter1} onFighterSelect={this.onFighter1Select} fightersList={this.getFighter1List() || []} />
                    <div className="btn-wrapper">
                        <Button
                          onClick={this.onFightStart}
                          variant="contained"
                          color="primary"
                          disabled={!fighter1 || !fighter2}
                        >Start Fight</Button>
                    </div>
                    <Fighter selectedFighter={fighter2} onFighterSelect={this.onFighter2Select} fightersList={this.getFighter2List() || []} />
                </div>
            </div>
        );
    }
}

export default Fight;