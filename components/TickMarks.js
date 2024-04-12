import { View, StyleSheet} from 'react-native';

const TickMarks = ({ ticks, sliderHeight }) => {
    return (
      <View style={styles.ticksContainer}>
        {ticks.map((_, index) => (
          <View
            key={index}
            style={[
              styles.tick,
              // Position the tick mark using top property
              { top: `${(index / (ticks.length - 1)) * 100}%` },
            ]}
          />
        ))}
      </View>
    );
  };

export default TickMarks;

const styles = StyleSheet.create({
    ticksContainer: {
      position: 'relative',
      height: 300, // Match slider height
      justifyContent: 'space-between',
    },
    tick: {
      position: 'absolute',
      left: 0,
      width: 10,
      height: 2,
      backgroundColor: 'black',
    }
  });