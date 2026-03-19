import { cmdCreateEvent } from './list/create';
import { cmdSetRules } from './list/rules';

export const commandList = [
  {
    commandList: cmdCreateEvent(),
  },
  {
    commandList: cmdSetRules(),
  },
];
