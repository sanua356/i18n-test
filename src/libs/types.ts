export type TLocale = 'en' | 'ru';

export type TDefaultTranslate = {
	[key: string]: string;
}

export type TTranslateParam = {
	[key: string]: string | number;
};

export type TTranslate = {
	source: string;
	localizator?: (source: string, params: TTranslateParam[]) => string;
};

export type TTranslaters = {
	[key: string]: TDefaultTranslate | TTranslate;
};
