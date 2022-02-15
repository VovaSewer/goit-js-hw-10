import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countriesCard from './country_card';
import countryCard from './counrty.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';    

const DEBOUNCE_DELAY = 300;
