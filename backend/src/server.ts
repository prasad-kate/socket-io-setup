import express from "express";
import homePageRoutes from "./routes/home.route";

const app = express();
const port = 8000; // temp hardcoding 8000

app.use(express.json());
app.use("/", homePageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
