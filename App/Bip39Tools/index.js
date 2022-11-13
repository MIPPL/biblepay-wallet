
import ZH from './wordlists/chinese_simplified.json';
import ZH_TR from './wordlists/chinese_traditional.json';
import EN from './wordlists/english.json';
import FR from './wordlists/french.json';
import IT from './wordlists/italian.json';
import JA from './wordlists/japanese.json';
import KO from './wordlists/korean.json';
import ES from './wordlists/spanish.json';

Bip39Tools = {};
Bip39Tools.wordlists = {
    EN,
    FR,
    IT,
    JA,
    KO,
    ES,
    ZH_TR,
    ZH
};

Bip39Tools.wordlistsLanguage = ['EN', 'FR', 'IT', 'JA', 'KO', 'ES', 'ZH', 'ZH_TR' ];

Bip39Tools.normalize = function (str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

Bip39Tools.accentsTidy = function(s){
    var r=s.toLowerCase();
    r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    r = r.replace(new RegExp(/\W/g),"");
    return r;
  };

Bip39Tools.getWordList = function(lang) {
    return this.wordlists[lang].map(Bip39Tools.normalize);
}

Bip39Tools.isWordInWordlist = function (word)   {
    var ret = ''
    if (word=='')   return ret;

    tidyWord = Bip39Tools.normalize(word);
    try {
        Bip39Tools.wordlistsLanguage.forEach( lang => {
            if (Bip39Tools.getWordList(lang).indexOf(tidyWord)!==-1)   {
                ret = lang;
                throw BreakException;
            } 
        })
    } catch (e) {
        //
    }
    return ret;
}

Bip39Tools.getWordListForLocale = function(languageCode) {
    if (Bip39Tools.wordlistsLanguage.indexOf(languageCode.toUpperCase()) !== -1 )   {
        return Bip39Tools.getWordList(languageCode.toUpperCase())
    }
    else    {
        return Bip39Tools.getWordList('EN');
    }
}

export default Bip39Tools;

