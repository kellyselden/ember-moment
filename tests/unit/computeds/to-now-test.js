import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import toNow from 'ember-moment/computeds/to-now';
import momentComputed from 'ember-moment/computeds/moment';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('ember-moment@computed:to-now', {
  setup() {
    moment.locale('en');
  }
});

test('get', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow('date'),
    properties: {
      date: moment().subtract(1, 'hour')
    },
    strictEqual: 'in an hour'
  });
});

test('get and set', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: toNow('date'),
    properties: {
      date: moment().subtract(1, 'hour')
    },
    strictEqual: 'in an hour'
  });

  subject.set('date', moment().subtract(2, 'hour'));
  assert.equal(subject.get('computed'), 'in 2 hours');
});

test('get literal', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow(moment().subtract(1, 'hour')),
    strictEqual: 'in an hour'
  });
});

test('get literal hide prefix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow(moment().subtract(1, 'hour'), 'LLLL', true),
    strictEqual: 'an hour'
  });
});


test('get literal with prefix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow(moment().subtract(1, 'hour'), 'LLLL', false),
    strictEqual: 'in an hour'
  });
});

test('composition with momentComputed get literal without suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), true),
    strictEqual: 'an hour'
  });
});

test('composition with momentComputed get literal with suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: toNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), false),
    strictEqual: 'in an hour'
  });
});
