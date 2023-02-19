const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();

//Service Listening on port 3000
app.listen(3000, () => {
  console.log("API server is running on port 3000");
});

//Enable CORS 
 app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

//GET API Endpoint - HIT BY FRONTEND WEBSITE 
app.get("/discount", async (req, res) => {
  const query = req.query;
  const CID =  query.CID;
  const shopAmount =  query.shoppingAmount;

  axios({
    method: 'post',
    url: 'https://3e361655-e2e6-400b-9786-a1e499c42a08.mock.pstmn.io',
    //url: 'http://localhost:9999/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      CID: CID,
      shopping: shopAmount
    }
  })
  .then(response => {
    if (response.status === 200 || response.status === 201) {
      res.status(200).json({
        success: true,
        data: response.data
      });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
  }) .catch(error => {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  });

})


function getData(shopAmount, CID) {

  const response = axios({
    method: 'post',
    url: 'http://localhost:9999',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      CID: CID,
      shopping: shopAmount
    }
  })
  
  return response;
  }
 
 
