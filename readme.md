# DOCUMENTATION FOR: Hooroo Front End Developer Coding Test
- author: Melissa Gattoni (meligatt@gmail.com)

# TO START:

## To build the project on dev environment:
1. From your terminal go to: `cd hooroo-test` directory.
2. Run `yarn install` to install dependencies.
3. to start the server on `localhost:3000`, run `yarn run dev`
4. To bundle the `/dist` folder, run: `yarn run bundle`.
5. To run Jest tests, run: `yarn test`.
6. in your browser go to: `http://localhost:3000`

# BACKEND APP FOLDER STRUCTURE:
- Even though I'm not a backend developer (yet) I have been using (for learning purposes) node-express to serve data.json, I have had to google and check tutorials, stack-overflow, ask people for tips, to start this basic express app, but It's been a good experience that make me want to learn more about API's and server side applications.

## root: app.js
- This file imports (using require for node) `Express` to run a basic server side app.
- This server side app contains 2 routes (1 for the api and 1 for the client app) that listen to HTTP request triggered from the client app.
- The route `/`: serves the file bundled in `./dist/index.html`
- The route `/api/result`: returns a .json list of all hotels available in `data/data.json` data set.
- #TODO: fine tune prod environment files.

## data
- `data/data.json` This folder contains a JSON file that will be used as responses for the API.

# CLIENT APP FOLDER STRUCTURE:

## React app:
- This app was create with a basic structure for a react app, (from scratch) and uses parcel (https://parceljs.org/) to generate the application bundles. I have used `Webpack` in other small projects, but this time I wanted to try `parcel` because I didn't need all the flexibility that webpack provides.

- `axios` (Promise based HTTP client for the browser and node.js) was used for HTTP request in the client app. It returns a promise which is in this app is handled on `componentDidMount` react lifecycle method of a component.

- Redux was Not used to keep it simple. I just used 1 stateful component (App) that passes props to child components in a `Top-down data flow`.

- *TODO*: Each component will have its own scss file for the styles, and in the public/stylesheets will have common styles.

## Components
- The components are located in `public/javascripts/components`,

- Language used in the components: ES6, JSX.

- The approach used is to create components that do a single task. The way I start the components is not (necessarily) breaking the UI down from the beginning, instead I code the UI and after that's done I refactor the components into different ones as needed.

- I try to add tests of components or helpers as soon they are added to the project, but to be transparent I still have to practice my TDD approach.

- If a piece of UI keeps being used in other components, I will consider create a card component. for now I won't over engineer the amount of components until is needed. This can be applied to the `<li>` mapped in the `HotelList` component.

- Collaboration with designers: I strongly believe in designer-dev agile collaboration and I iterate with them into the implementation phase as much as needed to iterate the UI and navigation. The ideal scenario would be that the less iterations the better to ship a feature fast. The designs should be (hopefully) previously tested, but that not always happens due to timeframes/resources.

- *TODO*: Fine tune on component's empty states: Each component should have a way to show to the user its state in a friendly way, for now the components have a basic validation if data still is not loaded. The idea is to get advantage of the empty states and communicate the status according to the tone of voice that is used across the app. Some components that render "no hotels found" can display instead a component with "suggestions" or "call to actions" to the user, so it creates a dialog between the user and the Interface. Empty states in general have to be handover by the design team and can be another presentational-stateless-component.

- *TODO*: change hardcoded `HOST URL` with env variables imported from a config file.

- *TODO*: simplify the way dependencies are imported in the tests: it should used variables imported from a setup file.

- *TODO*: In terms of "UI/UX design" I didn't do much because I prefer to focus on logic and testing for this particular code-challenge, I will update with some SCSS strategies I use in our pair session, or walk you through things I have done in previous projects to discuss css approaches.

- *TODO*: BEM approach: For the component styles I would use the Block Element Modifier approach because I have seen that helps to think a bit better on the name we give to our css classes. The idea behind BEM is that reduces class name clashes and helps us to increase specificity in our components styles, avoiding using "global classes" that can lead to class overriding easily.

- `.block` represents the higher level of an abstraction or component. In this case a block will be the name of the COMPONENT, this block class will not have styles defined on it, instead they will be defined into its internal `elements`.

- `.block__element` represents a descendent of .block that helps form .block as a whole.

- `.block__element--modifier` represents a different state or version of .block.

- *TODO* I will use SASS (responsibly) features like SCSS Functions, mixins and map structures to help organise our css code base easily.

- *TODO* I would use SASS-TRUE (https://github.com/oddbird/true) for sass unit tests.




# TESTING APPROACH:

## propTypes
- I added prop-types to each component: to document the intended types of properties passed to components, wich will give me a warn if the type passed to a component doesn't match to the type defined on the object: `MyComponent.propTypes = { ... }`

## Unit test
- For tests I used `JEST` and `enzyme` API (http://airbnb.io/enzyme/), I chose JEST because integrates well with react components, and enzyme which have good reputation among developer because its nice API full of features to make testing easier.

- snapshot test for react components, this will take a "picture" of our react component and will notify us about if the component changed the generated output, so we can review this `diff` and update if needed.

- Jest test for helper functions, This are unit test for functionality of JS functions, each unit test should test 1 particular case and avoid at all costs become "integration" test (which test different pieces of the modules are working together). A Unit test should have no dependencies on code outside the unit tested, dependencies should be mocked and no rely on (ie) real api calls. Unit-test are in charge of testing internal behaviour of a function.

- `yarn run jest --watch` running `jest` in watch mode could be beneficial for TDD approach, because will watch changes and as developer you will be aware of making your tests pass while coding the functionality, instead of breaking all the test and later fix them, more in a `cascade-fashion`, but to be 100% transparent I still have some practice to do to feel comfortable with starting my components with the approach of writing a failing test first.

- *TODO* For End-to-End purposes I would use Nightwatch.js (Browser automated testing) because Is the one that I have experience, but I would consider other options.

## Mock libraries
- To mock API requests I used `Nock` to intercept any request to `localhost:3000`, which will return a request status 200 if needed to be a successful response from API. This is necessary to not depend on real API requests, which will make our lovely unit test an "integration" one.

## Issues
- Issues found while testing App component (`public/javascripts/components/App`): I needed to mock the module imported in the componentDidMount (`makeRequest` from `public/javascripts/helpers`) so this way, when enzyme shallow-render the <App /> component it used the `mocked module` and not the real one, because we want to assume for this unit test that the request was a successful one and the promise of this module is back with data, I don't actually care about HTTP request here. The problem was that in the test file, I was mocking the imported module inside the `it()` method (using jest.mock(...)) and when I actually ran the test node terminal yield about `makeRequest.mockImplementation is not a function`, that made me google this issue, after a few hours 🤯: I realised that to make it work I had to put the setting up of the `jest.mock(moduleName, factory, options)` in the same scope of the imports in the test. Which made No sense to me. More info here: https://github.com/facebook/jest/issues/5993. In my past experience I have mocked functions used in components but that were passed via `props`, which made it easier to stub/mock dependencies implementation.



# ACCESSIBILITY

## HTML5 Markup
- One thing that for me as a frontend developer is very important is to make sure that my web-app/site is readable and clear even with styles disabled (if possible!!). The idea is that the styles are just `enhancement` layer for the experience of using the site, but the information *SHOULD* be still available and easy to read/print/share without ANY presentation layer activated. This approach benefits not just the user with older browsers, but users with slow connectivity and users that relay on screen readers.

- *TODO*: test the site on screen readers according to Web Content Accessibility Guidelines (WCAG) 2.1 (https://www.w3.org/TR/WCAG21/): This is a topic that I'm learning more and getting involved. The idea is that Accessibility should not be included "AFTER" all the components are done, this step should be included as part of developing a component. The problem with this approach is that require knowledge from this topic, that many of us lack for different reasons. This is why we have to take every chance we have to learn more about this area so it becomes part of our process like for example, adding unit tests. More information here: https://www.w3.org/WAI/fundamentals/accessibility-intro/

## Skip to content
- *TODO*: Add link to help navigate the app in case a keyboard is used instead of a mouse or touchpad to not rely on 1 specific type of hardware to access the content.

## Flexbox responsive features.
- *TODO*: Add css3 feature `flexbox`, it helps avoiding media queries to add breakpoints to the css. Flex box is a unidirectional way to lay out, align and distribute space among items in a container.
- The coverage of flexbox in modern browsers is pretty good (https://caniuse.com/#search=flexbox), although, if support for older browsers is required, we should make sure that the layout is still clear to the user without this feature, using some fallback strategies. Having analytics of the app usage helps to understand the user profile consuming our app.

## SVG:
- *TODO* Add stars for rating system using SVG (vector images), which can be enhanced for improve Accessibility, instead of using Raster images.


# ----- The code challenge -----
# Instructions

We would like you to work on this coding test so we can see how you would approach building out this feature. We think you should spend about 4 hours on the code test, we consider it a starting point to extend and modify in our technical interview.

## User Story to Implement

As a user of Qantas hotels I would like to see a list of hotels that can be sorted by price.

## More Information

Use the attached image of the search page as a guide and feel free to use any technology that you are comfortable with, it is not neccessary to match fonts and colours, e.g. we are cool if you choose Comic Sans and red and green.

Implement both these sorting options:
- Price (high-low)
- Price (low-high)

Star ratings on properties are divided into two types: ‘star’ and ‘self’ rated. Properties that are ‘self’ rated use a circle icon and properties that are ‘star’ rated use a star icon.

We value writing well tested code at Hooroo and would like to see tests around any code you write.

Feel free to send through any questions you may have.

## Included files

- JSON payload
- Mock of Qantas search results
- Qantas Logo
