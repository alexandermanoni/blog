# this file takes the database.ini file and parses it into a config for
# the connect.py file to use. [note]: database.ini should not be added
# to any source control (like github) it should be marked in the .gitignore file

# configparser is a module that provides a way for INI files to be processed
from configparser import ConfigParser

# load config loads the database.ini file and returns a config dictionary
# pass in the file to process and the section of parameters to read
def load_config(filename='database.ini', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    # create an empty dictionary for the configuration settings
    config = {}
    # check if the file has a postgresql section
    if parser.has_section(section):
        # gets a list of name, value pairs for options in a section
        params = parser.items(section)
        # map all the pairs as keys and values in the config dictionary
        for param in params:
            config[param[0]] = param[1]

    # if the section postgresql does not exist throw error that section not
    # found in file
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    # return result
    return config

# load config loads the database.ini file and returns a config dictionary
# pass in the file to process and the section of parameters to read
def load_mdb_config(filename='mongodb.ini', section='mongodb'):
    parser = ConfigParser()
    parser.read(filename)

    # create an empty dictionary for the configuration settings
    config = {}
    # check if the file has a postgresql section
    if parser.has_section(section):
        # gets a list of name, value pairs for options in a section
        params = parser.items(section)
        # map all the pairs as keys and values in the config dictionary
        for param in params:
            config[param[0]] = param[1]

    # if the section postgresql does not exist throw error that section not
    # found in file
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    # return result
    return config

# load and print the processed dictionary
if __name__ == '__main__':
    config = load_config()
    mdb_config = load_mdb_config()
    print(config)
    print(mdb_config)
