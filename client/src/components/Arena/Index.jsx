import React, {useEffect, useRef, useState} from 'react';
import './Arena.css';
import controls from "../../constants/controls";
import {getDamage, getHitPower} from "../../helpers";
import {saveFight} from "../../services/domainRequest/fightRequest";
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

const pressedKeys = new Map();
let firstFighterSuperHit = true;
let secondFighterSuperHit = true;

const Arena = ({fighter1, fighter2, finishFight}) => {

  let [firstFighterHealth, setFirstFighterHealth] = useState(fighter1.health);
  let [secondFighterHealth, setSecondFighterHealth] = useState(fighter2.health);
  const firstFighterKof = 100 / fighter1.health;
  const secondFighterKof = 100 / fighter2.health;

  const refEl = useRef(null);

  useEffect(() => {
    refEl.current.focus()
  }, [])


  const keyDown = (e) => {
    !pressedKeys.has(`Key${e.key.toUpperCase()}`) && pressedKeys.set(`Key${e.key.toUpperCase()}`, true);

    if (pressedKeys.has(controls.PlayerOneAttack) && !pressedKeys.has(controls.PlayerOneBlock)) {
      const damage = pressedKeys.has(controls.PlayerTwoBlock) ? getDamage(fighter1, fighter2) : getHitPower(fighter1);
      setSecondFighterHealth(secondFighterHealth - damage)
    }
    if (pressedKeys.has(controls.PlayerTwoAttack) && !pressedKeys.has(controls.PlayerTwoBlock)) {
      const damage = pressedKeys.has(controls.PlayerOneBlock) ? getDamage(fighter2, fighter1) : getHitPower(fighter2);
      setFirstFighterHealth(firstFighterHealth - damage);
    }
    if (firstFighterSuperHit && controls.PlayerOneCriticalHitCombination.every(item => pressedKeys.has(item))) {
      firstFighterSuperHit = false;
      setTimeout(() => {
        firstFighterSuperHit = true;
      }, 10000)
      const damage = fighter1.power * 2;
      setSecondFighterHealth(secondFighterHealth - damage)
    }
    if (secondFighterSuperHit && controls.PlayerTwoCriticalHitCombination.every(item => pressedKeys.has(item))) {
      secondFighterSuperHit = false;
      setTimeout(() => {
        secondFighterSuperHit = true;
      }, 10000)
      const damage = fighter2.power * 2;
      setFirstFighterHealth(firstFighterHealth - damage)
    }
  }

  if(firstFighterHealth <= 0 || secondFighterHealth <= 0){
    saveFight({
      fighter1: fighter1.name,
      fighter2: fighter2.name,
      winner: secondFighterHealth <= 0 ? fighter1.name : fighter2.name
    })
  }

  return (
    <div className="arena___root">
      <div className="arena___fight-status">
        <div className="arena___fighter-indicator">
          <span className="arena___fighter-name">{fighter1.name}</span>
          <div className="arena___health-indicator">
            <div className="arena___health-bar" style={{width: Math.max(firstFighterHealth * firstFighterKof, 0) + '%'}}/>
          </div>
        </div>
        <img className="arena___versus-sign" src="/resources/versus.png" />
          <div className="arena___fighter-indicator"><span className="arena___fighter-name">{fighter2.name}</span>
            <div className="arena___health-indicator">
              <div className="arena___health-bar" style={{width: Math.max(secondFighterHealth * secondFighterKof, 0) + '%'}}/>
            </div>
          </div>
      </div>
      <div className="arena___battlefield" ref={refEl} tabIndex="0" onKeyDown={keyDown} onKeyUp={e => pressedKeys.delete(`Key${e.key.toUpperCase()}`)}>
        <div className="arena___fighter arena___left-fighter">
          <img className="fighter-preview___img"
               src="https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif"
                                                                   title="Dhalsim" alt="Dhalsim"/>
          </div>
        <div className="arena___fighter arena___right-fighter">
          <img className="fighter-preview___img"
            src="https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif"
            title="Guile" alt="Guile" />
          </div>
      </div>

      <Dialog
        open={firstFighterHealth <= 0 || secondFighterHealth <= 0}
        onClose={finishFight}
      >
        <DialogTitle>Fighter {secondFighterHealth <= 0 ? fighter1.name : fighter2.name} won</DialogTitle>
        <DialogActions>
          <Button onClick={finishFight} color="primary" autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
)};

export default Arena;