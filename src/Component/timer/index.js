import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

import Timer from './timer/Timer.vue';
import timerEditorConfig from './timer/editorConfig';
import timerSchema from './timer/config';

import Count from './count/Count.vue';
import countEditorConfig from './count/editorConfig';
import countSchema from './count/config';

import Countdown from './countdown/Countdown.vue';
import countdownEditorConfig from './countdown/editorConfig';
import countdownSchema from './countdown/config';


register(REG_TITLECONFIG, {
  type: Timer.name,
  payload: timerEditorConfig,
});

register(REG_COMPONENTS, {
  type: Timer.name,
  payload: Timer,
});

register(REG_COMPONENTSSCHEMA, {
  type: Timer.name,
  payload: timerSchema,
});



register(REG_TITLECONFIG, {
  type: Count.name,
  payload: countEditorConfig,
});

register(REG_COMPONENTS, {
  type: Count.name,
  payload: Count,
});

register(REG_COMPONENTSSCHEMA, {
  type: Count.name,
  payload: countSchema,
});



register(REG_TITLECONFIG, {
  type: Countdown.name,
  payload: countdownEditorConfig,
});

register(REG_COMPONENTS, {
  type: Countdown.name,
  payload: Countdown,
});

register(REG_COMPONENTSSCHEMA, {
  type: Countdown.name,
  payload: countdownSchema,
});