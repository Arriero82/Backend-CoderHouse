import app from "./index.js";
import config from "./config/index.js";

const {port} = config.port

app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

