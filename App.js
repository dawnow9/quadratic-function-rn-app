import React, { useState, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { Appbar, TextInput, Text, Button } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

i18n.translations = {
  en: { 
    header: {
      quadraticFunction: 'Quadratic Function Calculator',
    },
    coefficientA: 'Coefficient A',
    coefficientB: 'Coefficient B',
    coefficientC: 'Coefficient C',
    summary: 'Summary',
    noSolutions: 'No solutions',
    aIssue: 'Coefficient A must be not equal to 0'
    }
  };

i18n.locale = 'en';
i18n.fallbacks = true;

const App  = (props) => {

  const [factorA, setFactorA] = useState('');
  const [factorB, setFactorB] = useState('');
  const [factorC, setFactorC] = useState('');
  const [summary, setSummary] = useState('');

  function calculate() {
    if (factorA != 0) {
      let delta = Math.pow(factorB, 2) - (4 * factorA * factorC)

      if (delta > 0) {
        let x1 = ((-1 * factorB) - Math.sqrt(delta)) / 2 * factorA
        let x2 = ((-1 * factorB) + Math.sqrt(delta)) / 2 * factorA
  
        setSummary("x1 = " + x1 + " x2 = " + x2)
      } else if(delta == 0) {
        let x1 = (-1 * factorB) / 2 * factorA
  
        setSummary("x = " + x1)
      } else {
        setSummary(i18n.t('noSolutions'))
      }
    } else {
      setSummary(i18n.t('aIssue'))
    }
  }

  return (
      <View>
        <Appbar.Header>
          <Appbar.Content title={i18n.t('header.quadraticFunction')} />
        </Appbar.Header>
        <View style={[styles.container]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold'}}>{i18n.t('coefficientA')}</Text>
            <TextInput
              label={i18n.t('coefficientA')}
              value={factorA}
              onChangeText={factorA => setFactorA(factorA)}
            />
            <Text style={{ fontWeight: 'bold' }}>{i18n.t('coefficientB')}</Text>
            <TextInput
              label={i18n.t('coefficientB')}
              value={factorB}
              onChangeText={factorB => setFactorB(factorB)}
            />
            <Text style={{ fontWeight: 'bold' }}>{i18n.t('coefficientC')}</Text>
            <TextInput
              label={i18n.t('coefficientC')}
              value={factorC}
              onChangeText={factorC => setFactorC(factorC)}
            />
          </View>
          <Button mode="contained" onPress={() => { calculate() }}>
            Oblicz
          </Button>

          <Text>{i18n.t('summary')}: {summary}</Text>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;