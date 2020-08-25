// imports REST API URL
import config from './Config';
import axios from 'axios'

// creates class for fetch API and methods to use with context

  export const request = (path, method = 'GET', body = null, requiresAuth = false, creds = null) => {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.data = JSON.stringify(body);
    }

    if (requiresAuth) {
      const endcodedCreds = btoa(`${creds.email}:${creds.password}`);
      options.headers['Authorization'] = `Basic ${endcodedCreds}`;
    }

    return axios(url, options);
  }

  
