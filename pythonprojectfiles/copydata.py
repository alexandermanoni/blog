# this file uses the connections to the postgres and mongodb databases to copy
# the data from mongodb to postgres

import psycopg2
from pandas import DataFrame
from pandas import option_context

from config import load_config
from config import load_mdb_config
from connect import connect
from connect import mongoConnect

if __name__ == '__main__':
    config = load_config()
    connection = connect(config)

    # connect to mongodb server
    mdb_config = load_mdb_config()
    mdb_connection = mongoConnect(mdb_config)

    # create cursor for operations
    cur = connection.cursor()

    # create a new table
    #cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")

    # pass data
    

    # query database and get data as python objects
    #cur.execute("SELECT * FROM test;")
    #print(cur.fetchone())

    # make changes persistent
    #connection.commit()


    
    # get collection
    mdbcollection = mdb_connection[mdb_config.get('collection')]

    # get all documents in the collection
    item_details = mdbcollection.find()

    count = 1

    for i in item_details:
        cur.execute("INSERT INTO posts (postid, posttitle, postbody, postdate) VALUES (%s, %s, %s, CURRENT_TIMESTAMP)", (count, i.get('title'), i.get('text')))
        count += 1

    connection.commit()

        
    # close communication
    cur.close()
    connection.close()
    

    # idk
    #item_details_dataframe = DataFrame(item_details)

    #with option_context('display.max_seq_items', None):
        #print(item_details_dataframe.columns)
