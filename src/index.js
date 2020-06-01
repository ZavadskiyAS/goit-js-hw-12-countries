import './styles.css';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import template_item from './tamplate/template-item.hbs';
import template_list from './tamplate/template-list.hbs';
import fetchCountries from './js/fetchCountries';

const input = document.querySelector('input[name="input"]');
input.addEventListener('input', debounce(inputHandler, 500));

const divList = document.querySelector('.item__list');

function inputHandler() {
  const country = input.value;

  fetchCountries(country)
    .then(result => {
      if (result.length > 10) {
        modeNotice();
        return
      } else if ((result.length > 1) && (result.length <= 10)) {
        const listCountrys = result.map(item => template_item(item)).join('');
        divList.innerHTML = listCountrys;
      } else if (result.length === 1) {
        const listCountry = result.map(item => template_list(item)).join('');
        divList.innerHTML = listCountry;
      } else if (!result.length) {
        return
      }
    })
    .catch(err => {
      modeEr();
    });
}

function modeNotice() {
  const notice = PNotify.notice({
    title: 'Too many matches found. Please enter a more specific query!',
    text: 'Click me.',
    modules: {
      Buttons: {
        closer: false,
        sticker: false
      }
    }
  });
  notice.on('click', function () {
    notice.close();
  });
}

function modeEr() {
  const noticeEr = PNotify.error({
    title: 'Error! Please enter a more specific query!',
    text: 'Click me.',
    modules: {
      Buttons: {
        closer: false,
        sticker: false
      }
    }
  });
  noticeEr.on('click', function () {
    noticeEr.close();
  });
}
