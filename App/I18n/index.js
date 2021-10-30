
import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import de from './locales/de';
import el from './locales/el';
import en from './locales/en';
import fr from './locales/fr';
import it from './locales/it';
import pt from './locales/pt';
import ru from './locales/ru';
import sv from './locales/sv';
import tr from './locales/tr';
import es from './locales/es';
import hi from './locales/hi';

import GlobalActions, { GlobalSelectors } from '../Redux/GlobalRedux'

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
    I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
    de,
    el,
    en,
    fr,
    hi,
    it,
    pt,
    ru,
    sv,
    tr,
    es
};

export default I18n;

