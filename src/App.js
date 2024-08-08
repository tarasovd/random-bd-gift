import React, { useState } from 'react'
import useSound from 'use-sound'
import baraban from './baraban.mp3';
import fanfary from './fanfary.mp3';

import Wheel from './components/wheel/Wheel';
import Win from './win.gif';
import './index.css'

const App = () => {
  const segments = [
    '1000000$',
    'Ящик кетамина',
    '4-ый гольф',
    'Исходный код',
    'Все слушают/только техно',
    'С Урбаном/на Мальту',
    'Бакс',
    'Сундук кетамина',
    'Такси/до Сигулды',
    '5л спрея/для носа',
    'Лиза',
    'Носки'
  ]
  const segments2 = [
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
    'Прыжок с парашютом',
  ]
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const [playBaraban, { stop: stopBaraban }] = useSound(baraban);
  const [playFanfary, { stop: stopFanfary }] = useSound(fanfary);
  window.playBaraban = playBaraban;
  window.stopBaraban = stopBaraban;
  window.playFanfary = playFanfary;
  window.stopFanfary = stopFanfary;
  const [winDisplayed, setWinDisplayed] = useState(false);
  const [csegments, setCsegments] = useState(segments);
  const [attempts, setAttempts] = useState(localStorage.getItem('attempts'))
  const onFinished = (winner) => {
    localStorage.setItem('attempts', localStorage.getItem('attempts') - 1)
    window.stopBaraban();
    window.playFanfary();
    let tmout = 10000;
    if (localStorage.getItem('attempts') <= 0) {
      winner = 'Прыжок с парашютом';
      tmout = 60000;
      setCsegments(segments2);
    }
    setWinDisplayed(winner);
    setTimeout(() => {
      setWinDisplayed(false);
      window.stopFanfary();
    }, tmout);
  }
  return (
    <React.Fragment>
      <h1>Happy Birthday Bark! Испытай удачу в этом абсолютно честном колесе фортуны</h1>
      <div className='wrapper'>
        <h2 className={ attempts <= 0 ? 'red' : ''}>{ attempts > 0 ? `Попыток осталось: ${ attempts }` : 'Чтобы пополнить попытки внесите 457€' }</h2>
        <Wheel
          segments={csegments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Вращайте/барабан'
          size={196}
          upDuration={200}
          downDuration={1801}
          winningSegment={segments[11]}
          playBaraban={playBaraban}
          setAttempts={setAttempts}
        />
      </div>
      { winDisplayed === 'Прыжок с парашютом' ? (
        <div className='wingif'>
          <p>
            <h3>Ура! Ты выиграл: { winDisplayed }</h3>
            <h3>Я в ахуе вообще</h3>
            <a href="https://drive.google.com/file/d/1ifbPksZjQYn6gGBPt7RtPh8HoOb_Ufw3/view?usp=sharing" target='_blank'><h3>Жми сюда: https://drive.google.com/file/d/1ifbPksZjQYn6gGBPt7RtPh8HoOb_Ufw3/view?usp=sharing</h3></a>
          </p>
          <img src={Win} alt='win' />
        </div>
      ) : null }
      { (winDisplayed && winDisplayed !== 'Прыжок с парашютом') ? (
        <div className='wingif'>
          <p>
            <h3>Ура! Ты выиграл: { winDisplayed }</h3>
            <h3>Я в ахуе вообще</h3>
          </p>
          <img src={Win} alt='win' />
        </div>
      ) : null }
    </React.Fragment>
  )
}

export default App
