import moment from 'moment';
import date from '../../helpers/date';
import { moduleFor, test } from 'ember-qunit';
import momentComputed from 'ember-moment/computeds/moment';
import compute from 'ember-macro-test-helpers/compute';

moduleFor('ember-moment@computed:moment', {
  setup() {
    moment.locale('en');
  }
});

test('get', function(assert) {
  assert.expect(1);

  let { result } = compute({
    computed: momentComputed('date'),
    properties: {
      date: date(0)
    }
  });

  assert.equal(result.format('MM/DD/YYYY'), '12/31/1969');
});

test('get and set', function(assert) {
  assert.expect(2);

  let { subject, result } = compute({
    computed: momentComputed('date'),
    properties: {
      date: date(0)
    }
  });

  assert.equal(result.format('MM/DD/YYYY'), '12/31/1969');
  subject.set('date', moment(date(0)).add(1, 'day'));
  assert.equal(subject.get('computed').format('MM/DD/YYYY'), '01/01/1970');
});

test('get with literal', function(assert) {
  assert.expect(1);

  let { result } = compute({
    computed: momentComputed(date(0))
  });

  assert.equal(result.format('MM/DD/YYYY'), '12/31/1969');
});
