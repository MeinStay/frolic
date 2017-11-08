# Frolic API 
This project allows a registered user to add categories of sports items and add items like football,basketball,cricket bat etc. under the predefined categories. He can view, update, delete the items too.

## Installation
1. First of all you will need the following softwares installed on you machine
    - **Python 2.7**
    - **PostgreSQL 9.3**
    - **Flask**
    - **SQLAlchemy**
	
2. To install Flask and SQLAlchemy you need to run the following command
    - `pip install flask` 
    - `pip install sqlalchemy`

3. Now, please import the news database in your PostgreSQL by typing this command. The .sql file is available in project.
    `psql -d frolic -f frolic.sql` 

4. You can check whether the database is installed or not by this command :
     `psql -d frolic`

5. You can also refer this link [Documentation](https://www.postgresql.org/docs/9.4/static/app-psql.html) for more details on PostgreSQL commands

6. Now, run the file log_analysis.py using the command to see the results :
    `python app.py`

7. This will start the project in (http://localhost:5000) the server will listen on 5000 port.

