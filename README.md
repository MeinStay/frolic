# Frolic API

This is a project which is configured in Amazon lightsail server. Below are it's details:

**Location of server** 
- http://54.255.134.97

**IP Adress of the server**
- 54.255.134.97

**Ports configured**
- 2200 SSH
- 123 NTP
- 80 HTTP

**List of softwares installed** 
- Python 2.7.12
- PostgreSQL 9.5.9
- Apache 2

**List of Configurations made**
- Registering and creating account on Amazon Lightsail
- Creating an server instance on Amazon Lightsail
- Connecting to the instance using SSH
- Creating a user grader 
- Using ssh-keygen generating a key pair for grader user and passing the public in authorized_keys file. Checked login for       grader user using SSH.
- Disabled the port 22 for SSH and configured the new port on 2200
- Disabled root login and password based authorization and enforced login using SSH only
- Configured firewall by disallowing all the ports except port 80, 2200, 123
- Created user catalog and configured the database using psql commands and given the catalog user permission to created the     database. Also, created a database named frolic.
- Configured the app in apache2 by creating WSGI app and created the .conf file for the App where the virtualhost is created   specifying the port and directory of the app.

**References**
- http://flask.pocoo.org/docs/0.12/deploying/mod_wsgi/
- http://www.bogotobogo.com/python/Flask/Python_Flask_HelloWorld_App_with_Apache_WSGI_Ubuntu14.php
- https://devops.profitbricks.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/
- https://www.linode.com/docs/web-servers/apache/apache-and-modwsgi-on-ubuntu-14-04-precise-pangolin
- https://help.ubuntu.com/lts/serverguide/automatic-updates.html
- https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps
- https://devops.profitbricks.com/tutorials/deploy-a-flask-application-on-ubuntu-1404/
