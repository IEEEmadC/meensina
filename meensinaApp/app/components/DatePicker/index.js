import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class DatePickerDefault extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const minDate = new Date();
    return (
      <DatePicker
        style={{width: 200}}
        date={this.props.date}
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0,
            position: 'absolute'
          }
        }}
        minDate={minDate}
        minuteInterval={10}
        onDateChange={this.props.onDateChange}
      />
    );
  }
}
