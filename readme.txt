/////
pre install server specs 
NodeJS, MySQL ExpressJS, ReactJS, npm

///// 
MySQL:
depending on MySQL config set up you may get this error with some queries:

`Error related to only_full_group_by when executing a query in MySql`

in which case you will need to execute the following commands

mysql> set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
mysql> set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

Database schema and structure are be one click loaded into phpMyAdmin ./tmp/envision_backUp.sql


///// 
./tmp 
this folder must be writtable 755 permissions should work
- database backups stored here
- csv uploads stored here

///// 
Ports
ports 5000 and 3000 need to be open to 
3000 is client
5000 is server
a reverse proxy will need to be set up so that / maps to :3000 and /server/ maps to :5000

/////
DropBox config: (https://www.dropbox.com/developers/apps/info/1xknq46qbu6gapw)
variables should they change are stored here: 
    client > package.json 'global'
    dropBoxPath = 'https://www.dropbox.com/Envision%20Support/Apps/envision-jsmart-dev/'
    dropBoxAccessToken = '***'
    dropBoxDownloadPath = '/'


