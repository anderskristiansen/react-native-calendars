import React, {Component} from 'react';
import XDate from 'xdate';
import PropTypes from 'prop-types';

import {parseDate} from '../interface';
import CalendarList from '../calendar-list';
import ReservationList from '../agenda/reservation-list';

/**
 * @description: Calendar List component with horizontal calendar and agenda list
 */
class CalendarListAgenda extends Component {
  static displayName = 'CalendarListAgenda';

  static propTypes = {
    ...CalendarList.propTypes,
    ...ReservationList.propTypes,
    loadItems: PropTypes.func,
    currentDay: PropTypes.any
  }

  constructor(props) {
    super(props);
    
    this.renderReservations = this.renderReservations.bind(this)
  }

  renderReservations (currentDay, shifts) {
    if (!currentDay || !currentDay.dateString || !shifts) {
      return {};
    }
    const selected = currentDay.dateString;
    const items = {};
    Object.keys(shifts).forEach(key => {
      if (selected === key) {
        items[key] = shifts[key];
      }
    });

    return items;
  };
  

  render() {
    const { loadItems, currentDay, items, ...rest } = this.props
    return (
      <>
        <CalendarList
        horizontal
        pagingEnabled
        onMonthChange={loadItems}
        onVisibleMonthsChange={months => {
          if (months && months.length === 1) {
            loadItems(months[0]);
          }
          if (months && months.length > 1) {
            loadItems(months[1]);
          }
        }}
        // displayLoadingIndicator
        hideArrows={false}
        onRefresh={() => {}} // Refreshcontrol handles this
        {...rest}
      />
      <ReservationList
        reservations={this.renderReservations(currentDay, items)}
        onDayChange={() => {}}
        selectedDay={parseDate(currentDay) || XDate(true)}
        {...rest}
      />
      </>
    );
  }
}

export default CalendarListAgenda;