import { barrows } from './osrs/barrows';
import { brutus } from './osrs/brutus';
import { dagannothKings } from './osrs/dagannothKings';
import { raksha } from './rs3/raksha';
import { vindicta } from './rs3/vindicta';

const osrsBosses = [barrows, brutus, dagannothKings];
const rs3Bosses = [raksha, vindicta];

export const allBosses = [...osrsBosses, ...rs3Bosses];
