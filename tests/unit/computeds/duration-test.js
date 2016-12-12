import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import duration from 'ember-moment/computeds/duration';
import humanize from 'ember-moment/computeds/humanize';
import locale from 'ember-moment/computeds/locale';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('ember-moment@computed:duration', {
  setup() {
    moment.locale('en');
  }
});

test('get and set (ms)', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: humanize(duration('ms')),
    properties: {
      ms: 5000
    },
    strictEqual: 'a few seconds'
  });

  subject.set('ms', 10800000);
  assert.equal(subject.get('computed'), '3 hours');
});

test('computed composition using locale and humanize', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: humanize(locale(duration('ms'), 'es')),
    properties: {
      ms: 5000
    },
    strictEqual: 'unos segundos'
  });

  subject.set('ms', 10800000);
  assert.equal(subject.get('computed'), '3 horas');
});

test('get and set (days)', function(assert) {
  assert.expect(2);

  let { subject } = compute({
    assert,
    computed: humanize(duration('numDays', 'days')),
    properties: {
      numDays: 4
    },
    strictEqual: '4 days'
  });

  subject.set('numDays', 1);
  assert.equal(subject.get('computed'), 'a day');
});

test('get literal (ms)', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: humanize(duration(5000)),
    strictEqual: 'a few seconds'
  });
});
