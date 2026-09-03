import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

interface Props {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
}

export const ActionButton = ({
  icon,
  label,
  onPress,
  color = "#3761A8",
}: Props) => {
  return (
    <Button mode="contained" icon={icon} onPress={onPress} buttonColor={color}>
      {label}
    </Button>
  );
};

export default ActionButton;

const styles = StyleSheet.create({});