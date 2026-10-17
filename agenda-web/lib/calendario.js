import { config } from './config.js';
import * as prueba from './calendario-prueba.js';
import * as google from './calendario-google.js';

export const calendario = config.modoPrueba ? prueba : google;
