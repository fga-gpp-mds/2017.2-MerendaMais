import React from 'react';
import { StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Checkbox from 'react-native-checkbox';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import store from '../Reducers/store';

const styles = StyleSheet.create({

  buttonContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },
  buttonPhoto: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF9500',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 20,
    color: 'blue',
    fontSize: 20,
    paddingRight: 10,
  },
});

export default class MainReportsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anyReport: false,
      whatever: '',
    };
  }

  checkingReport() {
    const newState = store.getState();
    if (newState.report.statusFoodQuality) {
      this.state.anyReport = true;
      return (
        <View>
          <Checkbox
            checked={this.state.anyReport}
            label=" "
          />
        </View>
      );
    }
    return (null);
  }

  render() {
    return (
      <View style={styles.content}>
        <Header
          title={'Relatórios'}
          backButton
        />
        <View>
          <TouchableOpacity
            onPress={() => Actions.stockFoodCheckoutScreen()}
          >
            <Text style={styles.text}>Estoque de Alimentos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.kitchenCheckoutScreen()}
          >
            <Text style={styles.text}>Cozinha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.refectoryCheckoutScreen()}
          >
            <Text style={styles.text}>Refeitório</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.DocCheckoutScreen()}
          >
            <Text style={styles.text}>Documentação</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            {this.checkingReport()}
            <TouchableOpacity
              onPress={() => Actions.foodQualityCheckoutScreen()}
            >
              <Text style={styles.text}>Qualidade da Alimentação</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => Actions.schoolSurroundingsCheckoutScreen()}
          >
            <Text style={styles.text}>Arredores da Escola</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.ReportObservationScreen()}
          >
            <Text style={styles.text}>+ Outras informações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonPhoto}
          >
            <Text style={styles.buttonText}>Anexar fotos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Gerar Relatório Final</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
