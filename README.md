[![Coverage Status](https://coveralls.io/repos/github/AndelaOSP/wire/badge.svg?branch=ch-redesign-dashboard)](https://coveralls.io/github/AndelaOSP/wire?branch=ch-redesign-dashboard)

# WIRE

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

 * After cloning the repository into your local machine:
   ```$ cd wire```

 * Then install all the packages
 NB: Make sure you have a package.json file on the root folder
  ``` $ yarn install```

### Run WIRE locally

* You will require to create an alias for wire.andela.com in your /etc/hosts which you can access by running this command
  ```sudo vim /etc/hosts``` which opens your /etc/hosts for editing using vim.
  To edit it,  press ```i``` key to get into insert mode and put these
   ```127.0.0.1       wire.andela.com``` after the last line.
  Save changes ```wq``` after pressing the escape ```esc``` key.

* You will need to add the following to your `.env` file:
```
NODE_ENV=development
API_URL=http://wire.andela.com:8080/api
ANDELA_API_BASE_URL=https://api.andela.com
BASE_URL=http://wire.andela.com:8080
```

## Running the tests

*Tests can can be run using one of the following commands
```
jest
npm run test:fend
jest --watch (to run test in  watch mode )
```

## Built With

* [Node Package Manager](https://www.npmjs.com/) - The package manager used
* [Webpack](https://webpack.js.org/concepts/) - A module bundler

## Contributing

Please read [CONTRIBUTING.md](https://github.com/AndelaOSP/wire/blob/develop/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* [Anthony Nandaa](https://github.com/andela-anandaa)
* [Daniel Wangai](https://github.com/danielwangai)
* [Humphrey Musonye](https://github.com/andela-hms)
* [Ian Kingori](https://github.com/andela-ik)
* [James Kimani](https://github.com/jimmykimani)
* [Mbarak Mbigo](https://github.com/Mbarak-mbigo)
* [Rachael Njeri](https://github.com/RayNjeri)
* [Robley Gori](https://github.com/Nairobley)
* [Akash Baga](https://github.com/akash-011)
* [Peter Musonye](https://github.com/peterpaints)

## License

This project is licensed under the MIT License.

## Acknowledgments

* Hat tip to Andela P&C Team Nairobi.
* [Humprey Musonye](https://github.com/andela-hms) for the designs.
