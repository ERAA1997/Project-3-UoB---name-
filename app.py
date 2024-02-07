# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from datetime import datetime, timedelta

#################################################
# Database Setup
#################################################
# Create our session (link) from Python to the DB


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """All available api routes."""
    return (
        f"heheheheheh:<br/>"
        f"Route containing percipitation analysis:"
        f"/api/v1.0/precipitation<br/>"
        f"Route containing a list of all the stations:"
        f"/api/v1.0/stations<br/>"
        f"Route containing temperature observations from the most active station within the previous year:"
        f"/api/v1.0/tobs<br/>"
        f"Route to see the minimum, maximum and average temperature recorded for any time after a specific date or within a certain time period:"
        f"/api/v1.0/start_date<br/>"
        f"/api/v1.0/start_date/end_date<br/>"
        f"start_date and end_date should be replaced with the date you are seeking written in the following format: Day-Month-Year"
    )
