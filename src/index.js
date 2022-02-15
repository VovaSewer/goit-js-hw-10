import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countriesCard from './country.hbs';
import countryCard from './country_card.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';    

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const value = e.target.value.trim();
    clearInput();

    fetchCountries(value)
        .then(country => {
            const countryLength = country.length;
            
            inputCheckValue(value);
            clearInput();

            if (countryLength > 10) {
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
            }

            else if (countryLength >= 2 && countryLength < 10) {
                refs.countryList.insertAdjacentHTML('beforeend', countriesCard(country));
            }

            else if (countryLength === 1) {
                refs.countryInfo.insertAdjacentHTML('beforeend', countryCard(country));
            }
            else if (!countryLength) {
                Notiflix.Notify.failure("Oops, there is no country with that name");
            }
        })
}

function clearInput() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function inputCheckValue(value) {
    if (value === '') {
        Notiflix.Notify.info('Please choose a country ');
    }
}

