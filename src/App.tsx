import { useEffect, useState } from 'react'
import './App.css'
import { translates } from './constants/translates'
import { useLocale } from './libs/useLocale'

function App() {
  const [count, setCount] = useState(1)
  const [dateTime, setDateTime] = useState(new Date());

  const { t, setLocale, locale } = useLocale(translates);

  const changeLocaleHandler = () => {
    if (locale === 'ru') {
      setLocale('en');
      return;
    }
    setLocale('ru');
  };

  const increment = () => {
    setCount((prev) => prev + 1 > 5 ? 1 : prev + 1);
  }

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 1000)
  }, [])

  return (
    <>
      <button onClick={changeLocaleHandler}>Локаль: {locale}</button>
      <h1>{t('greeting')}</h1>
      <h2>{t('counter', { count })} {t('apples', { count })}</h2>
      <h4>{t('datetime', { date: dateTime.toLocaleDateString(), time: dateTime.toLocaleTimeString() })}</h4>
      <button onClick={increment}>{t('increment')}</button>
    </>
  )
}

export default App
