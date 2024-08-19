import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        convertedAmount: undefined,
        error: undefined
    });
});
  app.post("/convert",async (req, res) => {
  
    const baseCurrency = req.body.baseCurrency;
    const targetCurrency = req.body.targetCurrency;
    const amount=req.body.amount;

      const content = await axios.get("https://v6.exchangerate-api.com/v6/5f5d5b9a295bd22e8a8bd2c9/latest/"+baseCurrency);
      const convertRate=content.data.conversion_rates[targetCurrency];

    const convertedAmount = amount*convertRate
  
      try {
      res.render("index.ejs", { amount:amount,baseCurrency:baseCurrency,convertedAmount :convertedAmount ,targetCurrency:targetCurrency});
      } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
      error: error.message,});
      }
    
      });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// HINTS:
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

/* app.get("/",async (req, res) => {
const base_country="INR";
const target_country="USD"
  const content = await axios.get("https://v6.exchangerate-api.com/v6/5f5d5b9a295bd22e8a8bd2c9/latest/"+base_country);
  const converted=content.data.conversion_rates[target_country];
  const input_inidan_ruppes=1000
  const output_dollars=1000*converted

  try {
  res.render("index.ejs", { base:base_country,converted:converted,output_dollars:output_dollars});
  } catch (error) {
  console.error("Failed to make request:", error.message);
  res.render("index.ejs", {
  error: error.message,});
  }

  });
 */