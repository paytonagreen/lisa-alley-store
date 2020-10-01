import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server.js'


configure({ adapter: new Adapter() });

// Establish API mocking before all tests
beforeAll(() => server.listen())

//Reset any request handlers added so as not to affect other tests
afterEach(() => {
  server.resetHandlers();
})

//Clean up after all tests are finished
afterAll(() => server.close());