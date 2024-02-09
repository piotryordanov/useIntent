import { FaDatabase } from 'react-icons/fa6';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdAutoGraph } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { TbLogicAnd, TbLogicBuffer, TbLogicXnor } from 'react-icons/tb';
import { FaPeopleGroup } from 'react-icons/fa6';

const icons = {
  data: FaDatabase,
  condition: TbLogicXnor,
  indicator: MdAutoGraph,
  longSignal: IoIosTrendingUp,
  shortSignal: IoIosTrendingDown,
  logicalAND: TbLogicAnd,
  logicalOR: TbLogicBuffer,
  delete: MdDeleteOutline,
  add: IoIosAddCircleOutline,
  gossip: FaPeopleGroup,
};

export default icons;
