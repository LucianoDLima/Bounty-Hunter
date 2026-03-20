import { cmdCreateEvent } from './list/start';
import { cmdSetRules } from './list/rules';

export const commandList = [
  {
    commandList: cmdCreateEvent(),
  },
  {
    commandList: cmdSetRules(),
  },
];
