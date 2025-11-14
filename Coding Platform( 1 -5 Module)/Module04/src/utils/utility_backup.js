const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const axios = require('axios');


const getIdByLanguage = (language) => {

  const languageId = {
    "c++": 54,
    "java": 62,
    "javascript": 63,
    "python": 71
  }

  return languageId[language.toLowerCase()];
}

const submitBatch = async (submissions) => {
  //  console.log("hello");
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false' // if true, then we have to send base64 encoded code // when false, then we have to send plain code
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_RAPIDAPIKEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };

  async function fetchData() {
    try {
      // console.log("done1");
      const response = await axios.request(options);
      // console.log("done2");
      return response.data;   // what will this return?? // it will return array of tokens // now, we will make GET request with each token and fetch actual result
    } catch (error) {
      if (error.response) {
        // console.log("done3");
    console.error('Judge0 error status:', error.response.status);
    console.error('Judge0 error body:', error.response.data);
  } else {
    // console.log("done4");
    console.error("its error: " +error);
  }
  // console.log("done5");
  // throw new Error(`Failed to submit batch: ${error.message}`);
    }
  }

  return await fetchData();

}


function waiting(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const submitToken = async (resultToken) => {
// console.log("hii")
  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: resultToken.join(','),
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.JUDGE0_RAPIDAPIKEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("today error: ",error);
    }
  }

  while (true) {
    console.log("here1");
    const result = await fetchData();
    console.log(result);
    console.log("here2");
    // status_id should be greater than 2 // otherwise call again and again
    const IsResultObtained = result.submissions.every(r => r.status_id > 2);
    console.log("here3");
    if (IsResultObtained) {
      return result.submissions;
    }
    console.log("here4");
    // we will wait for 1 sec after one request
    await waiting(1000);
  }

}


module.exports = { getIdByLanguage, submitBatch, submitToken };