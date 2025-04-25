
import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const config = {
  theme: 'system',
  explode: false,
  scale: 1 };


const ctrl = new Pane({
  title: 'Config',
  expanded: true });


const update = () => {
  document.documentElement.dataset.theme = config.theme;
  document.documentElement.dataset.explode = config.explode;
  document.documentElement.style.setProperty('--scale', config.scale);
};

const sync = event => {
  if (
  !document.startViewTransition ||
  event.target.controller.view.labelElement.innerText !== 'Theme')

  return update();
  document.startViewTransition(() => update());
};

ctrl.addBinding(config, 'scale', {
  min: 1,
  max: 5,
  step: 0.1,
  label: 'Scale' });

ctrl.addBinding(config, 'explode', {
  label: 'Explode' });


ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark' } });



ctrl.on('change', sync);
update();

// cmd + G stuff...
const CMD = 91;
const MOD = 71;

const STATE = {
  cmd: false,
  mod: false };


const handleActivation = e => {
  if (e.keyCode === CMD && !STATE.cmd) STATE.cmd = true;
  if (e.keyCode === MOD && STATE.cmd && !STATE.mod) STATE.mod = true;

  if (STATE.cmd && STATE.mod) {
    e.preventDefault();
    confetti();
    document.documentElement.style.setProperty('--active', 1);
  }
};

const unload = e => {
  if (e.keyCode === CMD || e.keyCode === MOD) STATE.cmd = STATE.mod = false;
  document.documentElement.style.setProperty('--active', 0.6);
};

document.body.addEventListener('keydown', handleActivation);
document.body.addEventListener('keyup', unload);
//# sourceURL=pen.js
    