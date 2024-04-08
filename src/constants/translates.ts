/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { TTranslaters } from '../libs/types';
export const translates: TTranslaters = {
	ru: {
		greeting: 'Привет!',
		counter: 'Счётчик {count}',
		increment: 'Увеличить счётчик',
		datetime: 'Дата: {date}; Время {time}',
		apples: {
			source: 'куплено ',
			localizator: (str, params) => {
				switch (params['count']) {
					case 1:
						return str + 'яблоко';
					case 2:
					case 3:
					case 4:
						return str + 'яблока';
					case 5:
						return str + 'яблок';
					default:
						return str;
				}
			}
		},
	},
	en: {
		greeting: 'Hello!',
		counter: 'Counter {count}',
		increment: 'Increment count',
		datetime: 'Date: {date}; Time {time}',
		apples: {
			source: 'buy ',
			localizator: (str, params) => {
				if (params['count'] > 1) {
					return str + 'apples';
				} else {
					return str + 'apple';
				}
			}
		}
	},
};
