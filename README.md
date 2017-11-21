# wire
WIRE - Workspace Incident Reporting platform

## Getting Started
To get this project up and running locally proceed as follows:

### Prerequisites
Software you need to install and how to install:

 * You will need to have npm, you can install node using the [node.js installer](https://nodejs.org/en/download/). npm is installed as part of node.

### Installing

Series of steps to setup development environment

 * Clone the git repository
  ``` $ git clone https://github.com/AndelaOSP/wire.git```

 * After clonning the repository into your local machine:
   ```$ cd wire```

 * Then install all the modules
 NB: Make sure you have a package.json file on the root folder
  ``` $ yarn install```

## Run WIRE locally
* You will require to create an alias for wire.andela.com in your /etc/hosts which you can access by running this command
  ```sudo vim /etc/hosts``` which opens your /etc/hosts for editing using vim.
  To edit it,  press ```i``` key to get into insert mode and put these
   ```127.0.0.1       wire.andela.com``` after the last line.
  Save changes ```wq``` after pressing the escape ```esc``` key.
