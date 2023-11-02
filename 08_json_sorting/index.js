import axios from "axios";

const endpoints = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
  // "http://localhost:3000/easy",
  // "http://localhost:3000/medium",
  // "http://localhost:3000/hard",
];

/*
 * Function for getting data from endpoint
 */
async function getData(url, retries) {
  while (retries > 0) {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      retries--;

      //  After n times error
      if (retries === 0) {
        console.error(`[Fail] ${url}: The endpoint is unavailable`);
      }
    }
  }

  return;
}

/*
 * Function for searching keys "isDone"
 */
function searchIsDone(data) {
  if (data.hasOwnProperty("isDone")) {
    if (data.isDone === "isDone") return data.isDone;
  }

  for (const key in data) {
    if (key === "isDone" && data[key] !== undefined) {
      return data[key];
    }

    if (typeof data[key] === "object") {
      const result = searchIsDone(data[key]);

      if (result) return result;
    }
  }

  return null;
}

/*
 * Function for getting results from
 */
async function resultsFromEndpoints() {
  let trueCount = 0;
  let falseCount = 0;

  for (const endpoint of endpoints) {
    const data = await getData(endpoint, 3);

    if (data) {
      const isDoneValue = searchIsDone(data);

      if (isDoneValue) {
        console.log(`[Success] ${endpoint}: isDone - True`);
        trueCount++;
      } else {
        console.log(`[Success] ${endpoint}: isDone - False`);
        falseCount++;
      }
    }
  }

  console.log(`Found True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
}

/*
 * Start program
 */
resultsFromEndpoints();
