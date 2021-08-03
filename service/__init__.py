import uvicorn
import app

if __name__ == "__main__":
    debug = app.get_boolean_env("DEBUG")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=debug)
