import errorHandler from "errorhandler"
import app from "./app"

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"),"0.0.0.0",() => {
  console.log(
    "App is running at http://0.0.0.0:%d in %s mode",
    app.get("port")
  )
  console.log("  Press CTRL-C to stop\n")
})

export default server