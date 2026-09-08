import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

interface Props {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;

  // permite personalizar o estilo do botão
  style?: any;
}

export const ActionButton = ({
  icon,
  label,
  onPress,
  color = "#3761A8",
  style,
}: Props) => {
  return (
    <Button
      mode="contained"
      icon={icon}
      onPress={onPress}
      buttonColor={color}
      style={[styles.button, style]}
      labelStyle={styles.label}
    >
      {label}
    </Button>
  );
};

export default ActionButton;

const styles = StyleSheet.create({

  // deixa os botões maiores e arredondados
  button: {
    borderRadius: 18,
    minHeight: 64,
    justifyContent: "center",
    marginVertical: 2,
  },

  // texto dos botões
  label: {
    fontSize: 16,
    fontWeight: "900",
  },

});