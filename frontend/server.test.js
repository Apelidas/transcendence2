const {testing} = require('./server');

describe('test', () => {
    it('should return true', () => {
        expect(testing()).toBe(true);
    });

})