import chai from 'chai';

import luckyNumber from '../lib/index';

chai.expect();

const expect = chai.expect;

describe('index', () => {
  it('Number should be lucky', () => {
    expect(luckyNumber).to.be.equal(7);
  });
});
