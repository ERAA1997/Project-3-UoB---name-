# Project 3: An investigation into the split of property ownership in Glasgow, Scotland

![Title Image](ReadMe_Resources/glasgow-skyline-bw-wee-ezgif.com-webp-to-jpg-converter.png)

#### image credit: [Adrian McMurchie](https://amcmurchie.com/product/glasgow-skyline-monochrome/)

# Project objective:  
This project aims to showcase the skills we have learned in the University of Birmingham's Data Analytics Bootcamp
to date. 

# Overview

## Purpose
The purpose of this project was to analysis how much property is owned by the housing association in Glasgow. 


## Dataset  

We obtained our dataset from Kaggle and it provides a complete overview of the properties within Glasgow's postcodes
by ownership, split between the Housing Association and others. While this dataset contained a "cleaned" version of the data, 
we decided to use the base dataset and demonstrate our data-cleaning skills. A link to the dataset can be found [here](https://www.kaggle.com/datasets/dimodimchev/glasgow-housing-association-properties) and also in
the resources folder. A limitation of this dataset is that the data was that it was last updated in May 2022.

## Methodology  

### Data review and cleaning

After selecting our Kaggle dataset we used a Jupyter Notebook and Pandas. Using Pandas we could quickly and easily identify the
completeness of data. The dataset was read into Pandas using the _read_csv_ function. The cleaned data was then exported as a new CSV 
to be used later.

In addition to the Kaggle dataset, we required a geoJSON file of the Glasgow postcodes to plot

The previously cleaned CSV of our Kaggle dataset was then merged with the geoJSON to create an update geoJSON with the additional data being
callable within it

## Database

As a final addition to our project, we used Flask to connect our SQLite database.


## Visualisations

We decided to use a Choropleth map to visualize the differences in Housing Association ownership. 

### Resources
For this project we utilized many sources, please find them below;

[SQL](https://www.sqlite.org/index.html)  
[Flask API](https://flask.palletsprojects.com/en/3.0.x/)  
[Chloropleth](https://plotly.com/python/choropleth-maps/)  
[Leaflet](https://leafletjs.com/reference.html)  
[D3](https://d3js.org/) 

## Collaborators

* [Sadek Ahmed](https://github.com/Sadek-Ahmed16)  
* [Daniel Hughes](https://github.com/DanielHughes1580)  
* [Eoghan Alton](https://github.com/ERAA1997)
* [Kashfi Khalid](https://github.com/kashfi-khalid)
