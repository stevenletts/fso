import express from "express";
import { bmiCalculator, classifyBMI } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (!height || !weight) {
    res.status(400);
    res.send({ error: "missing a parameter" });
  }

  const result = classifyBMI(bmiCalculator(Number(height), Number(weight)));
  try {
    res.send(result);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/exercises", (req, res) => {
  const days = req.body.days;
  const target = req.body.target;

  if (!days || !target) {
    res.status(400);
    res.send({ error: "missing a parameter" });
  }
  const result = exerciseCalculator(days, target);
  try {
    res.send(result);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`app running onn ${PORT}`);
});
