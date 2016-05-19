DreamFactory Angular2 Auth Component
====================================

This repo contains a sample auth component for dreamfactory written in Angular2.

#Getting DreamFactory on your local machine

To download and install DreamFactory, follow the instructions [here](http://wiki.dreamfactory.com/DreamFactory/Installation). Alternatively, you can create a [free hosted developer account](http://www.dreamfactory.com) at www.dreamfactory.com if you don't want to install DreamFactory locally.

#Configuring your DreamFactory instance to run the app

- Enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) for development purposes.
    - In the admin console, navigate to the Config tab and click on CORS in the left sidebar.
    - Click Add.
    - Set Origin, Paths, and Headers to *.
    - Set Max Age to 0.
    - Allow all HTTP verbs and check the Enabled box.
    - Click update when you are done.
    - More info on setting up CORS is available [here](http://wiki.dreamfactory.com/DreamFactory/Tutorials/Enabling_CORS_Access).

- Create a default role for new users and enable open registration
    - In the admin console, click the Roles tab then click Create in the left sidebar.
    - Enter a name for the role and check the Active box.
    - Go to the Access tab.
    - Add a new entry under Service Access (you can make it more restrictive later).
        - set Service = All
        - set Component = *
        - check all HTTP verbs under Access
        - set Requester = API
    - Click Create Role.
    - Click the Services tab, then edit the user service. Go to Config and enable Allow Open Registration.
    - Set the Open Reg Role Id to the name of the role you just created.
    - Make sure Open Reg Email Service Id is blank, so that new users can register without email confirmation.
    - Save changes.


#How develop the project on your local machine 

##Prerequisites

- node v4.x.x higher and npm 2.14.7
- to develop independently, without having to put source files in df instance, make sure cors is enabled and necessary permissions are given to services in your df instance

##Run project
```bash
git clone --depth 1 https://github.com/dreamfactorysoftware/angular2-auth-component.git
cd angular2-auth-component/angular2-auth-component
# paste your dsp_instance_url and app_key in app/index.html

# install the project's dependencies
npm install

# watches your files and uses livereload by default
npm start

``


#Additional Resources

More detailed information on the DreamFactory REST API is available [here](http://wiki.dreamfactory.com/DreamFactory/API).

The live API documentation included in the admin console is a great way to learn how the DreamFactory REST API works.
