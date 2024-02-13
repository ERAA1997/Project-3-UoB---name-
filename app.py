# Import the dependencies.
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
from flask import Flask, render_template

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
# Return static HTML file with JS code
# Ideally would serve from independent web server, but not practical in test environment
def home():
    return render_template ("index.html")


# Define route for the Glasgowmap


@app.route("/map")
def chloropleth():
    return render_template ("Choropleth.html")

# Define route for the Pie Charts


@app.route("/chart")
def pieChart():
    return render_template ("PieChart.html") 











if __name__ == "__main__":
    app.run(debug=True)