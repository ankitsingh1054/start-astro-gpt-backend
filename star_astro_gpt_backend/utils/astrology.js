/* eslint-disable camelcase */
const fetch = require('node-fetch');

const nakshatra = async data => {
  const {day, month, year, hour, min, lat, lon, tzone, gender} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone, gender});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/nakshatra_report', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to fetch nakshatra data!');
  }

  return result.json();
};

const ascendant = async data => {
  const {day, month, year, hour, min, lat, lon, tzone} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/general_ascendant_report', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to fetch ascendant data!');
  }

  return result.json();
};

const numerology = async data => {
  const {day, month, year, name} = data;

  const raw = JSON.stringify({day, month, year, name});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/numero_table', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to fetch numerology data!');
  }

  return result.json();
};

const gemSuggestion = async data => {
  const {day, month, year, hour, min, lat, lon, tzone} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/basic_gem_suggestion', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to fetch gem suggestion data!');
  }

  return result.json();
};

const sadesati = async data => {
  const {day, month, year, hour, min, lat, lon, tzone} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/sadhesati_current_status', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to sadesati data!');
  }

  return result.json();
};

const manglik = async data => {
  const {day, month, year, hour, min, lat, lon, tzone} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/manglik', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to manglik  data!');
  }

  return result.json();
};

const manglikRemedy = async data => {
  const {day, month, year, hour, min, lat, lon, tzone} = data;

  const raw = JSON.stringify({day, month, year, hour, min, lat, lon, tzone});
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/manglik_remedy', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to manglik remedy data!');
  }

  return result.json();
};

const matchMakingReport = async data => {
  const {
    m_day,
    m_month,
    m_year,
    m_hour,
    m_min,
    m_lat,
    m_lon,
    m_tzone,
    f_day,
    f_month,
    f_year,
    f_hour,
    f_min,
    f_lat,
    f_lon,
    f_tzone
  } = data;

  const raw = JSON.stringify({
    m_day,
    m_month,
    m_year,
    m_hour,
    m_min,
    m_lat,
    m_lon,
    m_tzone,
    f_day,
    f_month,
    f_year,
    f_hour,
    f_min,
    f_lat,
    f_lon,
    f_tzone
  });
  const requestOption = {
    method: 'POST',
    headers: {
      authorization: `Basic ${process.env.ASTROLOGY_API_KEY}`,
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow'
  };
  const result = await fetch('https://json.astrologyapi.com/v1/match_making_report', requestOption);
  if (result.status !== 200) {
    throw new Error('Failed to match making data!');
  }

  return result.json();
};

module.exports = {
  nakshatra,
  ascendant,
  numerology,
  gemSuggestion,
  sadesati,
  manglik,
  manglikRemedy,
  matchMakingReport
};
