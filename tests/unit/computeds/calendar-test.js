import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import calendar from 'ember-moment/computeds/calendar';
import tz from 'ember-moment/computeds/tz';
import locale from 'ember-moment/computeds/locale';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('ember-moment@computed:moment', {
  setup() {
    moment.locale('en');
  }
});

test('two args (date, referenceDate)', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: calendar('date', 'referenceDate'),
    properties: {
      date: tz(moment('2013-01-01T02:30:26Z'), 'America/New_York'),
      referenceDate: moment('2013-01-01T12:00:00Z')
    },
    strictEqual: 'Yesterday at 9:30 PM'
  });
});

test('with es locale', function(assert) {
  assert.expect(1);

  compute({
    assert,
    computed: calendar('date', 'referenceDate'),
    properties: {
      date: tz(locale(moment('2013-01-01T08:30:26Z'), 'es'), 'America/New_York'),
      referenceDate: locale(moment('2013-01-01T12:00:00Z'), 'es')
    },
    strictEqual: 'hoy a las 3:30'
  });
});
