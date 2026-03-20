import { cmdCreateEvent } from './list/start';
import { cmdSetRules } from './list/rules';
import { cmdJoinEvent } from './list/join';

export const commandList = [
  {
    commandList: cmdCreateEvent(),
  },
  {
    commandList: cmdSetRules(),
  },
  {
    commandList: cmdJoinEvent(),
  },
];
