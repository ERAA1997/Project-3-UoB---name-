from flask import Flask, render_template, jsonify, request
import json
from flask_sqlalchemy import SQLAlchemy
import os

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Configure the SQLAlchemy part of the app instance
# Adjust the path to your SQLite database as needed
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create an SQLAlchemy db instance
db = SQLAlchemy(app)

#################################################
# Database Model Setup
#################################################
class GeoData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    geometry_type = db.Column(db.String(50), nullable=False)
    geometry_coordinates = db.Column(db.Text, nullable=False)  # Storing as Text; consider JSON for structured handling
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    ha_percent = db.Column(db.Float, nullable=True)
    ha_properties = db.Column(db.Integer, nullable=True)
    other_properties = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<GeoData {self.name}>'

# Ensure the database tables are created (in a more production-ready setup, consider using Flask-Migrate)
def create_tables():
    print("Entering create_tables() function...")  
    with app.app_context():
        db.create_all()
        print("Tables created successfully.") 



#################################################
# Flask Routes
#################################################

# filename = os.path.join(app.static_folder, 'merged_data.geojson')
# @app.route('/upload_data', methods=['GET'])
# def upload_data():
#     # Validate data received from the client
#     with open(filename) as test_file:
#         features = json.load(test_file)
#         features = features['features']
#     # Iterate over features and insert data into the database
#     for feature in features:
#         try:
#             geo_data = GeoData(
#                 geometry_type=feature['geometry']['type'],
#                 geometry_coordinates=json.dumps(feature['geometry']['coordinates']),  # Convert to JSON string
#                 name=feature['properties']['name'],  # Access name from 'properties'
#                 description=feature['properties']['description'],  # Access description
#                 ha_percent=feature['properties']['HA_Percentage'],  # Access ha_percent
#                 ha_properties=feature['properties']['HA_Properties'],  # Access ha_properties
#                 other_properties=feature['properties']['Other_Properties']  # Access other_properties
#             )
#             db.session.add(geo_data)
#             db.session.commit()
#         except KeyError:
#             return f"Missing required data in feature: {feature}", 400

#     return "Data successfully uploaded!", 200




@app.route("/")
def home():
    # Return static HTML file with JS code
    return render_template("index.html")

@app.route("/map")
def chloropleth():
    # Define route for the Choropleth map
    return render_template("Choropleth.html")

@app.route("/chart")
def pieChart():
    # Define route for the Pie Charts
    return render_template("PieChart.html")

@app.route('/data/geojson')
def geojson_data():
    # Print the database URI to confirm the path
    print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")

    with app.app_context():
        # Query your database for all entries
        data = GeoData.query.all()

        # Check if no data exists in the table
        if not data:
            print("No data found in the geo_data table.")
            return jsonify({"message": "No data found in the geo_data table."}), 404

        # Convert to GeoJSON format
        features = []
        for entry in data:
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": entry.geometry_type,
                    "coordinates": json.loads(entry.geometry_coordinates)
                },
                "properties": {
                    "name": entry.name,
                    "description": entry.description,
                    "HA_Properties": entry.ha_properties,
                    "Other_Properties": entry.other_properties
                }
            }
            features.append(feature)

        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        return jsonify(geojson)

if __name__ == "__main__":
    create_tables()
    app.run(debug=True)