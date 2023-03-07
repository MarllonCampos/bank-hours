import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'

import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";


dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.locale('pt-br')