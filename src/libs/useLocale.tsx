import { useState } from 'react';
import { Localizator } from './localization';
import { TLocale, TTranslaters } from './types';

export const useLocale = (obj: TTranslaters) => {
	const [locale, setLocale] = useState<TLocale>('ru');

	const lib = new Localizator(obj, locale);

	return { t: lib.t, setLocale, locale };
};
