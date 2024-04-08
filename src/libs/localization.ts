/* eslint-disable @typescript-eslint/no-explicit-any */

import { TDefaultTranslate, TLocale, TTranslate, TTranslateParam, TTranslaters } from './types';

const finderRegex = new RegExp(/\{([^}]+)\}/g);

export class Localizator {
	#translaters: TTranslaters = {};
	#locale: TLocale = 'ru';

	constructor(obj: TTranslaters, locale: TLocale) {
		this.#translaters = obj;
		this.#locale = locale;
	}

	#isDefaultPhrase(phrases: any, key: string): phrases is TDefaultTranslate {
		const value: string | object = phrases[key];
		return typeof value === 'string';
	}

	#isCustomTranslate(phrases: any, key: string): phrases is { [key: string]: TTranslate } {
		const value: string | object = phrases[key];
		return typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'localizator');
	}

	#isParametrizedTranslate(phrases: any, key: string, params?: TTranslateParam):
		phrases is { [key: string]: TTranslate } {
		const value: string | object = phrases[key];
		return typeof value === 'string' && Object.keys(params ?? {}).length > 0;
	}

	t = (localeKey: string, params?: TTranslateParam) => {
		const phrases = this.#translaters[this.#locale];
		if (this.#isDefaultPhrase(phrases, localeKey) && !params) {
			return phrases[localeKey];
		}
		if (this.#isCustomTranslate(phrases, localeKey)) {
			const phrase: any = phrases[localeKey];
			return phrase.localizator(phrase.source, params);
		}
		if (this.#isParametrizedTranslate(phrases, localeKey, params)) {
			let phrase: any = phrases[localeKey];
			const phraseParams = phrase.match(finderRegex);
			phraseParams.forEach((param: string) => {
				const paramName = param.replace('{', '').replace('}', '');
				if (!params || !Object.prototype.hasOwnProperty.call(params, paramName)) {
					throw new Error(
						`В строку перевода "${phrase}", не пришёл параметр: ${paramName}`
					);
				}
				phrase = phrase.replace(param, params[paramName]);
			});
			return phrase;
		}
	}

	changeLocale = (newLocale: TLocale) => {
		this.#locale = newLocale;
	}
}
