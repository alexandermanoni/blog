# this file connects to a postgresql database

# psycopg2 is a postgresql database adapter for python
import psycopg2
# mongodb modules
from pymongo import MongoClient
# import the configuration dictionary from database.ini
from config import load_config

from config import load_mdb_config

# connect to the database with the config
def connect(config):
    """ Connect to the PostgreSQL database server """
    try:
        # connecting to the PostgreSQL server
        # [note]: the ** operator unpacks the dictionary
        # [note]: with automatically closes the connection 
        with psycopg2.connect(**config) as conn:
            # prints if successful
            print('Connected to the PostgreSQL server.\nDB: ' + config.get('database'))
            # returns instance of the connection class 
            return conn
        
    # throw error if failed
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

# connect to database with ATLAS_URI
def mongoConnect(config):
    ATLAS_URI = "mongodb+srv://alexmanonijr:hgQGhpmP18mgTo5D@cluster0.y2k1rro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try:
        #client = MongoClient(str(config.get('ATLAS_URI')))
        client = MongoClient(ATLAS_URI)
        db = client[config.get('database')]

        print("Connected to Blog db")

        return db

    except Exception as e:
        print(e)

    #ATLAS_URI = "mongodb+srv://alexmanonijr:hgQGhpmP18mgTo5D@cluster0.y2k1rro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    #client = MongoClient(ATLAS_URI)

    #return client['Blog']

if __name__ == '__main__':
    # load dictionary
    config = load_config()
    # connect to db
    connect(config)

    # connect to mongodb
    mdb_config = load_mdb_config()
    mdb = mongoConnect(mdb_config)
