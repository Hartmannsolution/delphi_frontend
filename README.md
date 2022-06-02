# Material UI Demo code
## This is a project to showcase the material UI components
The project is using vitejs for build and devserver
The project is using typescript

## Using material-iu
`npm install @mui/material @emotion/react @emotion/styled @mui/system`  
`npm install @mui/icons-material`    
- Add the following code lines to the `<head>` tag of your public/index.html file.
`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`   
`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />`   
- If images are needed create a new folder: public in root folder and put images folder here. Then refer with eg: `import logo from '/images/avatar/thomas_profil.jpg';`  
`npm install @mui/x-data-grid`To use the data grid (used in BasicTable)   
`npm install --save date-fns`: to use the datepicker  
`npm install @mui/x-date-pickers`: to use the datepicker.  
`npm i -D @types/node`: In order to compile the typescript

#### Errors
- When importing a 3rd party tool to typescript app, also import the data types: `npm install uuid && npm install -D @types/uuid`
  - https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam

## How to use
1. Write a class name (that is first created by the teacher)
2. Fill out 3 positive and 3 negative answers and submit
3. Load all answers and rate them
4. As a teacher enter the page a new and give "<classname> eval" to start the class discussion portion with comments on the answers.

## Deploy React Router App to nginx
[See context here](https://stackoverflow.com/questions/53207059/react-nginx-routing-to-subdirectory)  
[See demo project here](https://github.com/HartmannDemoCode/react2021fall) with a script.sh file to deploy to droplet. If on windows, then run the scriptfile from git bash.

### Assumptions:

1. Your React App is based on create-react-app package (you are using react-router-dom).
2. You are using Nginx and the root path is being used by another service
3. You want to deploy the React App on a subdirectory and be able to serve all statics of your React App from that subdirectory.

### React App Changes:
Based on official documentation.

1. Update your BrowserRouter by adding a basename. Example: `<BrowserRouter basename="/webapp">`.
2. Specify a homepage on first line of your package.json. Example: `"homepage": "/webapp"`.
3.If you are referencing a static file by its relative path, you should add the subdirectory to that reference. 
  - Example: `src="/static/logo/logo.png"` becomes `src="/webapp/static/logo/logo.png"`.
  - Example with react-bootstrap Nav.Link: `<Nav.Link href="/webapp/about">About</Nav.Link>` **different** from using react-router NavLink: `NavLink activeClassName="active" to="/about">About</NavLink>`

### Nginx Changes:

```
location ^~ /webapp {
   alias /var/www/myapp/build;
   try_files $uri $uri/ /webapp/index.html;
}
```

### Full example of nginx config file
`/etc/nginx/sites-enabled/default`:

```
upstream tomcat {
    server 127.0.0.1:8081 fail_timeout=0;
}

server {
        root /var/www;
        index index.html index.htm index.nginx-debian.html;

        server_name example.com;

        location ^~ /webapp {
            alias /var/www/webapp/build;
            try_files $uri $uri/ /webapp/index.html;
        }

        location /test {
            root /var/www/;
        }
        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            # try_files $uri $uri/ =404;
            include proxy_params;
            proxy_pass http://tomcat/;

        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/edu.bugelhartmann.dk/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/edu.bugelhartmann.dk/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        server_name example.com;
    listen 80;
    return 404; # managed by Certbot
}
```
### Deploy script: deploy.sh
```sh
npm run build
# scp -r ./dist/* root@edu.bugelhartmann.dk:/var/www/delphi/
rsync -aP ./dist/ root@edu.bugelhartmann.dk:/var/www/delphi/
```

### Add subdomain on Digital Ocean
[source](https://www.datanovia.com/en/lessons/how-to-create-a-subdomain-on-digitalocean/)

1. Create an ‘A’ record for the subdomain
- Go to your DNS settings page and open the records where you have main domain DNS settings.  Now add an A record with subdomain in Enter Name field (only add subdomain part. For example if you are going to create a subdomain apps.example.com then only enter apps and in the IP address field, enter the droplet IP.
2. Create subdomain directory and index file
- Create the subdomain and add the index file:

subdomain_dir=/var/www/delphi
3. Create directory
sudo mkdir $subdomain_dir
4. Create index.html
sudo touch $subdomain_dir/index.html

5. Copy the default config for the new subdomaine
```sh
mysubdomain="apps.example.com"
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/$mysubdomain
sudo ln -s /etc/nginx/sites-available/$mysubdomain /etc/nginx/sites-enabled/$mysubdomain
```
  
6. Open the config file
`sudo nano /etc/nginx/sites-available/$mysubdomain`
  
7. Edit the file
  - The content should look something like this
```
server {
        listen 80;
        listen [::]:80;
        root /var/www/apps;
        index index.html;
        server_name delphi.cphbusinessapps.dk;
}
```
8. Restart NGINX
`sudo service nginx restart`
9. Obtain an SSL Certificate
`sudo certbot --nginx -d $mysubdomai`