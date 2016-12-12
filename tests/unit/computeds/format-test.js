import Ember from 'ember';
import moment from 'moment';
import getOwner from 'ember-moment/utils/get-owner';
import { moduleFor, test } from 'ember-qunit';
import format from 'ember-moment/computeds/format';
import momentComputed from 'ember-moment/computeds/moment';
import date from '../../helpers/date';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('controller:test-subject', {
  setup() {
    moment.locale('en');
  }
});

const { observer, computed } = Ember;
const { alias } = computed;

test('get value as dependent key, format as dependent key', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: format('date', 'dateFormat'),
    properties: {
      date: date(0),
      dateFormat: 'MM/DD'
    },
    strictEqual: '12/31'
  });
});

test('composition with moment computed: get value as dependent key, format as dependent key', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: format(momentComputed('date'), 'dateFormat'),
    properties: {
      date: date(0),
      dateFormat: 'MM/DD'
    },
    strictEqual: '12/31'
  });
});

test('get value as literal, format as literal', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: format('date', 'MM/DD'),
    properties: {
      date: date(0)
    },
    strictEqual: '12/31'
  });
});

test('get literal', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: format(date(0), 'MM/DD'),
    strictEqual: '12/31'
  });
});

test('single argument supported', function(assert) {
  assert.expect(1);

  const timestamp = date(0);

  compute({
    assert,
    computed: format(timestamp),
    properties: {
      date: date(0)
    },
    strictEqual: moment(timestamp).format()
  });
});

test('Date - set', function(assert) {
  assert.expect(1);

  let { subject } = compute({
    computed: format('date', 'MM/DD'),
    properties: {
      date: date(0)
    }
  });

  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('computed'), '02/08');
});

test('invalid date', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: format('date', 'MM/DD'),
    properties: {
      date: 'ZZZZZ'
    },
    strictEqual: 'Invalid date'
  });
});

test('is computed handled', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: format('date', 'format'),
    properties: {
      date: date(0),
      _format: 'MM/DD',
      format: alias('_format')
    },
    strictEqual: '12/31'
  });

  subject.set('_format', 'MM');
  assert.equal(subject.get('computed'), '12');
});

test('composition with moment computed: is computed handled', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: format(momentComputed('date'), 'format'),
    properties: {
      date: date(0),
      _format: 'MM/DD',
      format: alias('_format')
    },
    strictEqual: '12/31'
  });

  subject.set('_format', 'MM');
  assert.equal(subject.get('computed'), '12');
});

test('outputFormat option is respected', function(assert) {
  assert.expect(2);

  this.register('config:environment', {
    moment: {
      outputFormat: 'YYYY'
    }
  });

  let { subject } = compute.call(this, {
    assert,
    subject: getOwner(this).resolveRegistration('controller:test-subject'),
    computed: format('date'),
    properties: {
      date: '2013-01-01'
    },
    strictEqual: '2013'
  });

  subject.set('date', '2014-01-01');
  assert.equal(subject.get('computed'), '2014');
});

test('Observers trigger on date change', function(assert) {
  assert.expect(2);
  let observeFired = false;

  let { subject } = compute({
    assert,
    subject: getOwner(this).resolveRegistration('controller:test-subject').reopen({
      shortDateChanged: observer('computed', () => {
        observeFired = true;
      })
    }),
    computed: format('date', 'format'),
    properties: {
      date: date(0),
      _format: 'MM/DD',
      format: alias('_format')
    },
    strictEqual: '12/31'
  });

  subject.set('_format', 'MM');
  assert.equal(observeFired, true);
});

test('Observers trigger on date change', function(assert) {
  assert.expect(3);
  let observeFired = false;

  let { subject } = compute({
    assert,
    computed: format('date', 'format'),
    computedProperties: {
      shortDateChanged: observer('computed', () => {
        observeFired = true;
      })
    },
    properties: {
      date: date(0),
      _format: 'MM/DD',
      format: alias('_format')
    },
    strictEqual: '12/31'
  });

  subject.set('date', date('2013-02-08T09:30:26'));
  assert.equal(subject.get('computed'), '02/08');
  assert.equal(observeFired, true);
});
