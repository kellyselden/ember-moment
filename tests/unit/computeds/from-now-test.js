import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import fromNow from 'ember-moment/computeds/from-now';
import momentComputed from 'ember-moment/computeds/moment';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('ember-moment@computed:from-now', {
  setup() {
    moment.locale('en');
  }
});

test('get', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow('date'),
    properties: {
      date: moment().subtract(1, 'hour')
    },
    strictEqual: 'an hour ago'
  });
});

test('get and set', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: fromNow('date'),
    properties: {
      date: moment().subtract(1, 'hour')
    },
    strictEqual: 'an hour ago'
  });

  subject.set('date', moment().subtract(2, 'hour'));
  assert.equal(subject.get('computed'), '2 hours ago');
});

test('get literal', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow(moment().subtract(1, 'hour')),
    strictEqual: 'an hour ago'
  });
});

test('get literal without suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow(moment().subtract(1, 'hour'), 'LLLL', true),
    strictEqual: 'an hour'
  });
});

test('get literal with suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow(moment().subtract(1, 'hour'), 'LLLL', false),
    strictEqual: 'an hour ago'
  });
});

test('composition with momentComputed get literal without suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), true),
    strictEqual: 'an hour'
  });
});

test('composition with momentComputed get literal with suffix', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: fromNow(momentComputed(moment().subtract(1, 'hour'), 'LLLL'), false),
    strictEqual: 'an hour ago'
  });
});
