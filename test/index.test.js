const { test } = require('@playwright/test');
const sinon = require('sinon');
const Analytics = require('@segment/analytics.js-core').constructor;
const Survicate = require('../lib/');

test.describe('Survicate', () => {
    let analytics;
    let survicate;
    const options = {
        workspaceKey: 'xMIeFQrceKnfKOuoYXZOVgqbsLlqYMGD'
    };

    test.beforeEach(async () => {
        analytics = new Analytics();
        survicate = new Survicate(options);
        analytics.use(Survicate);
        analytics.add(survicate);

        sinon.stub(survicate, 'load');
    });

    test.afterEach(async () => {
        sinon.restore();
    });

    test('should have the right settings', async () => {
        analytics.compare(Survicate, integration('Survicate')
          .global('_sva')
          .option('workspaceKey', ''));
    });

    test.describe('before loading', () => {

        test('should call #load', async () => {
            analytics.initialize();
            sinon.assert.calledOnce(survicate.load);
        });
    });

    test('should load', async () => {
        analytics.load(survicate);
    });

    test.describe('after loading', () => {

        test.describe('#identify', () => {

            test('should send user_id', async () => {
                analytics.identify('id');
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id'
                });
            });

            test('should send email', async () => {
                analytics.identify('id', { email: 'email@example.com' });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id',
                    email: 'email@example.com'
                });
            });

            test('should send first and last name', async () => {
                analytics.identify('id', { firstName: 'john', lastName: 'doe' });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id',
                    first_name: 'john',
                    last_name: 'doe'
                });
            });

            test('should send custom traits', async () => {
                analytics.identify('id', { eyes: 'brown' });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id',
                    eyes: 'brown'
                });
            });

            test('should flatten object traits', async () => {
                analytics.identify('id', {
                    address: {
                        street: '6th St',
                        city: 'San Francisco',
                        state: 'CA',
                        postalCode: '94103',
                        country: 'USA'
                    }
                });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id',
                    address_street: '6th St',
                    address_city: 'San Francisco',
                    address_state: 'CA',
                    address_postal_code: '94103',
                    address_country: 'USA'
                });
            });

            test('should drop arrays in traits', async () => {
                analytics.identify('id', {
                    stringifyMe: [{ a: 'b' }, { a: 'c' }]
                });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    user_id: 'id'
                });
            });

        });

        test.describe('#group', () => {

            test('should send group_id', async () => {
                analytics.group('id');
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    group_id: 'id'
                });
            });

            test('should send custom traits', async () => {
                analytics.group('id', { eyes: 'brown' });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    group_id: 'id',
                    group_eyes: 'brown'
                });
            });

            test('should flatten object traits', async () => {
                analytics.group('id', {
                    address: {
                        street: '6th St',
                        city: 'San Francisco',
                        state: 'CA',
                        postalCode: '94103',
                        country: 'USA'
                    }
                });
                sinon.assert.calledWith(window._sva.setVisitorTraits, {
                    group_id: 'id',
                    group_address_street: '6th St',
                    group_address_city: 'San Francisco',
                    group_address_state: 'CA',
                    group_address_postal_code: '94103',
                    group_address_country: 'USA'
                });
            });

            test('should drop arrays in traits', async () => {
              analytics.group('id', {
                  stringifyMe: [{ a: 'b' }, { a: 'c' }]
              });
              sinon.assert.calledWith(window._sva.setVisitorTraits, {
                  group_id: 'id'
              });
          });
      });
  });
});

