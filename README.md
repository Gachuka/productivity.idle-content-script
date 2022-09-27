# Productivity.Idle-content-script

This repository is used to compile a content-script.js that is used and runs in the background in [Productivity.Idle](https://github.com/Gachuka/productivity.idle).

The content-script.js contains the event listener to increment "characters" on every key input.

An interval timer that prompts a PUT request to the server (setup with [Productivity.Idle-api](https://github.com/Gachuka/productivity.idle-api)) to save the progress.

# Build

Tech stack used
- **JavaScript**:  Language used to write *Productivity.Idle-content-script*
- **Axios**: Make API requests
- **Webpack**: Bundler to compile the JavaScript with dependencies into a static asset to be used.

# Getting Started

This is meant to be used to compile a JavaScript file to be used in the Chrome Extension [Productivity.Idle](https://github.com/Gachuka/productivity.idle). 

By itself, it may not run properly or not run at all.

## Development Environment (Local)

### System Requirements

Before you begin, make sure you have all the below installed:
- [Node.js v16 or above](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Initializing all the packages

Execute the following command in the project root folder:

```
npm install
```
This will install the required dependencies needed.

### Using Local/Remote Database

Navigate to *./src/content-script.js*, uncomment the line of code with the wanted API_URL and leave the other one commented.

- Using local database
```
// const API_URL = "REMOTE_DATABASE_URL"
const  API_URL = "http://localhost:PORT_NUMBER"
```

- Using remote database
```
const API_URL = "REMOTE_DATABASE_URL"
// const  API_URL = "http://localhost:PORT_NUMBER"
```

### Using Webpack 

When the code is ready to be bundled, execute the following code:
```
npx webpack --config webpack.config.js
```
or
```
npm run bundle
```

This will look for your code in *./src/content-script.js* as an input and the bundled code will be outputed in *./dist/content-script.js*

The outputed content-script.js can then be used in **Productivity.Idle** chrome extension

If needed, webpack.config.js can be modified to change the input and output.

```
const  path = require('path');

module.exports = {
	entry:  './<DIRECTORY>/<INPUT_FILE_NAME>',
	output: {
		filename:  '<OUTPUT_FILE_NAME>',
		path:  path.resolve(__dirname, '<DIRECTORY>'),
	},
};
```

[Webpack Documentation](https://webpack.js.org/guides/getting-started/)

# Lessons Learned

Initially, the content-script.js was written in vanilla JavaScript. Since Chrome Extensions does not recognize Node Module, fetch() was used to write API requests without using Axios or a similar library. 

Later, Webpack was used to be able to use dependencies to use Axios because chaining fetch() requests sequences got a bit confusing.

Webpack is a very good and faster alternative to React to create a static JavaScript file that uses dependencies, in this case ONLY the JavaScript file was needed. 

React has a lot of unnecessary boilerplate files and dependencies for what was needed, the built-in bundler is slow because of it and creates a lot of unneeded files.

# Next Steps
For the chrome extension: 

- Figure out a way to communicate "logged in" status to the background listener and also knowing which user is logged in to GET and PUT to the correct user in the backend.