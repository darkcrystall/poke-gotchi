import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

interface Props {
  icon: string;
  label: string;
  value: number;
  inverse?: boolean;
}

export const StatBar = ({ icon, label, value, inverse = false }: Props) => {
  const displayValue = inverse ? 100 - value : value;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {icon} {label}: {value}
      </Text>
      <ProgressBar progress={displayValue / 100} style={styles.bar} />
    </View>
  );
};

export default StatBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
    color: "#ffffffff",
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
});