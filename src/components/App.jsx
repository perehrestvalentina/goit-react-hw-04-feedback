import { useState } from 'react';

import FeedbackOptions from 'components/FeedbackOptions';
import Section from 'components/Section';

import Statistics from 'components/Statistics';
import css from './Statistics/Statistics.module.css';

import Notification from 'components/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };

  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return total ? Math.round((good / total) * 100).toFixed(2) : 0;
  };

  const stateName = Object.keys({ good, neutral, bad });

  return (
    <div className={css.counter}>
      <Section title={'Please leave feedback'}>
        <div>
          <FeedbackOptions
            options={stateName}
            onLeaveFeedback={onLeaveFeedback}
          />
        </div>
      </Section>

      <Section title={'Statistics'}>
        {total !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification
            message={'There is no feedback'}
            className={css.message__item}
          />
        )}
      </Section>
    </div>
  );
};
