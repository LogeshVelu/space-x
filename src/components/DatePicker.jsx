import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { subDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { Dialog, Pane } from 'evergreen-ui';
import Styled from 'styled-components';

const StyledPane = Styled(Pane)`

`;

const DatePicker = ({show, onClose, onChange}) => {
    const [state, setState] = useState([
        {
            startDate: subDays(new Date(), 6),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const staticRanges = [{
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 6).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            },
            label: 'Past week',
            key: 'Past week',
            range: () => ({
                startDate: subDays(new Date(), 6),
                endDate: new Date(),
            })
        }, {
            label: 'Past month',
            key: 'Past month',
            range: () => ({
                startDate: subDays(new Date(), 30),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 30).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            },
        }, {
            label: 'Past 3 months',
            key: 'Past 3 months',
            range: () => ({
                startDate: subDays(new Date(), 90),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 90).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            }
        }, {
            label: 'Past 6 months',
            key: 'Past 6 months',
            range: () => ({
                startDate: subDays(new Date(), 180),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 180).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            }
        }, {
            label: 'Past year',
            key: 'Past year',
            range: () => ({
                startDate: subDays(new Date(), 365),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 365).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            }
        }, {
            label: 'Past 2 years',
            key: 'Past 2 years',
            range: () => ({
                startDate: subDays(new Date(), 730),
                endDate: new Date(),
            }),
            isSelected: (range) => {
                return (
                    range.startDate.toDateString() === subDays(new Date(), 730).toDateString() &&
                    range.endDate.toDateString() === new Date().toDateString()
                );
            }
        }
        ];

    const onRangeChange = (item) => {
        setState([item.selection]);
        const matchedRange = staticRanges.find((r) => r.isSelected(item.selection));
        const label = matchedRange ? matchedRange.label : '';
        onChange({...item.selection, label});
    }
    
    return <>
    <StyledPane>
      <Dialog
        isShown={show}
        hasHeader={false}
        onCloseComplete={() => onClose(false)}
        hasFooter={false}
        width={1000}
        height={1000}
      >
        <DateRangePicker
        onChange={onRangeChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        inputRanges={[]}
        staticRanges={staticRanges}
    />
      </Dialog>
    </StyledPane>
    </>
};


export default DatePicker;