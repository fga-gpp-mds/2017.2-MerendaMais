import React from 'react';
import PropTypes from 'prop-types';
import openMap from 'react-native-open-maps';
import { Alert, StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, BackHandler } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import InvitedCounselorsData from '../../components/InvitedCounselorsData';
import Button from '../../components/Button';
import { backHandlerPopToMain } from '../../NavigationFunctions';
import Header from '../../components/Header';


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  icon: {
    marginRight: 15,
  },

  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  Container: {
    marginTop: 15,
    marginHorizontal: 20,
  },

  Picker: {
    marginHorizontal: 15,
    width: '95%',
  },

  popUp: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },

  popUpText: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: width * 0.05,
    textAlignVertical: 'top',
  },

  textBox: {
    margin: 1.5,
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    paddingVertical: 3,
  },

  textBoxDescription: {
    marginTop: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
  },

  textDescription: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 15,
  },

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },

  invitedList: {
    borderColor: 'black',
    height: 250,
    borderWidth: 1.5,
    padding: 1,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  dialogButtonStyle: {
    marginVertical: -16,
  },

  footerPopUp: {
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopListText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },

  InputFieldStyle: {
    marginHorizontal: 65,
    marginLeft: 35,
    paddingVertical: 8,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textLogo: {
    fontSize: width * 0.08,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 60,
  },
  wrapper: {
    height: 100,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon_header: {
    marginLeft: 20,
  },
  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },

});

export default class ScheduleMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      appToken: this.props.counselor.token,
      nuvemCode: this.props.counselor.nuvemCode,
      codGrupoDestino: this.props.counselor.profile.codGroup,
      meeting: {
        lat: this.props.scheduleMeeting.meetingLatitude,
        long: this.props.scheduleMeeting.meetingLongitude,
        date: '',
        time: '',
        meetingListOfInvitees: this.props.meetingListOfInvitees,
        meetingDescription: '',
      },
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  getCounselorFromGroup() {
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  changeStyleAccordingToInput(counselor) {
    if
    (this.props.meetingListOfInviteesWithCounselorInformations[counselor.nuvemCode] !== undefined) {
      return [styles.listRegisters, { borderColor: '#FF9500' }];
    }
    return styles.listRegisters;
  }

  cancelInviteList() {
    const meetingNewLists = {
      meetingNewListWithInformations: {},
      meetingNewList: {},
    };

    this.props.setMeetingNewLists(meetingNewLists);

    this.popupDialogCounselor.dismiss();
  }

  manageInvitedListState(counselor) {
    const meetingNewLists = {
      meetingNewListWithInformations: this.props.meetingListOfInviteesWithCounselorInformations,
      meetingNewList: this.state.meeting.meetingListOfInvitees,
    };
    // If the counselor is not at the list (undefined),
    // we will add him to the list, where its key is the counselor's nuvemCode
    if (meetingNewLists.meetingNewListWithInformations[counselor.nuvemCode] === undefined) {
      meetingNewLists.meetingNewListWithInformations[counselor.nuvemCode] = counselor;
      meetingNewLists.meetingNewList[counselor.nuvemCode] = {
        nuvemCode: counselor.nuvemCode,
        confirmed: false,
      };
      this.props.setMeetingNewLists(meetingNewLists);
    } else {
      delete meetingNewLists.meetingNewListWithInformations[counselor.nuvemCode];
      delete meetingNewLists.meetingNewList[counselor.nuvemCode];
      this.props.setMeetingNewLists(meetingNewLists);
    }
    this.forceUpdate();
  }

  deleteSpecificCounselor(counselorNuvemCode) {
    const meetingNewLists = {
      meetingNewListWithInformations: this.props.meetingListOfInviteesWithCounselorInformations,
      meetingNewList: this.state.meeting.meetingListOfInvitees,
    };

    delete meetingNewLists.meetingNewListWithInformations[counselorNuvemCode];
    delete meetingNewLists.meetingNewList[counselorNuvemCode];

    this.props.setMeetingNewLists(meetingNewLists);

    this.forceUpdate();
  }

  showInvitedList() {
    // Check if the Object is empty
    if (Object.keys(this.props.meetingListOfInviteesWithCounselorInformations)
      .length !== 0) {
      return (
        <View>
          <Text style={styles.TopListText}>Lista de conselheiros convidados</Text>
          <View style={styles.invitedList}>
            <ScrollView
              /* This make the nested ScrollView works. */
              onTouchStart={() => this.setState({ enabled: false })}
              onTouchEnd={() => this.setState({ enabled: true })}
              onScrollBeginDrag={() => this.setState({ enabled: false })}
              onScrollEndDrag={() => this.setState({ enabled: true })}
            >
              {
                Object.entries(this.props.meetingListOfInviteesWithCounselorInformations)
                  .map(counselor => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <InvitedCounselorsData
                        key={counselor[0]}
                        {...counselor[1]}
                      />
                      <TouchableOpacity
                        onPress={() => this.deleteSpecificCounselor(counselor[0])}
                      >
                        <EvilIcons name="close" style={styles.icon} size={26} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))
              }
            </ScrollView>
          </View>
        </View>
      );
    }
    return null;
  }

  buttonActivation() {
    if (this.state.meeting.date !== '' && this.state.meeting.lat !== null
    && Object.keys(this.state.meeting.meetingListOfInvitees).length !== 0
     && this.state.meeting.long !== null && this.state.meeting.time !== '') {
      if (this.props.isLoading) {
        return (
          <ActivityIndicator style={styles.loading} size="large" color="#FF9500" />
        );
      }
      return (
        <Button
          enabled
          key="scheduleMeetingButton"
          text="Agendar Reunião"
          onPress={() => { this.props.asyncSchedulingMeeting(this.state); }}
        />
      );
    }
    return (
      <Button
        enabled={false}
        text="Agendar Reunião"
        key="scheduleMeetingButton"
        onPress={() => {}}
        disabled
      />
    );
  }

  openLocationChoosen() {
    openMap({ latitude: this.state.meeting.lat, longitude: this.state.meeting.long });
  }

  showLocation() {
    if (this.state.meeting.lat !== null && this.state.meeting.long !== null) {
      return (
        <View style={styles.Container}>
          <TouchableOpacity
            key="openMeetingLocation"
            style={styles.button}
            // onPress={() => this.openLocationChoosen()}
            onPress={() => Alert.alert(
              'Ver Localização',
              'Abriremos a localização selecionada no aplicativo de mapas escolhido em seu aparelho',
              [
                { text: 'OK', onPress: () => this.openLocationChoosen(), style: 'cancel' },
                { text: 'Cancelar', style: 'cancel' },

              ],
              { cancelable: false },
            )}
          >
            <Text style={styles.buttonText}>Ver Localização</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.textDescription}>Localização</Text>
        <View style={[styles.InputFieldStyle]}>
          <Text>Ainda não foi selecionada</Text>
        </View>
      </View>
    );
  }


  renderCounselorList() {
    if (this.props.listOfCounselorsInAGroup.length === 0) {
      return (
        <ActivityIndicator style={{ marginTop: 50, justifyContent: 'center' }} size="large" color="#FF9500" />
      );
    }
    return (
      this.props.listOfCounselorsInAGroup.map(counselor => (
        <View style={this.changeStyleAccordingToInput(counselor)} key={counselor.nuvemCode}>
          <TouchableOpacity
            onPress={() => this.manageInvitedListState(counselor)}
          >
            <View style={styles.textBox}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                {counselor.name}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>CPF: </Text>
                {counselor.profile.cpf}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
                {counselor.profile.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  }

  render() {
    return (
      <View style={styles.principal}>
        <PopupDialog
          ref={(popupDialogCounselor) => {
            this.popupDialogCounselor = popupDialogCounselor;
          }}
          dialogTitle={<DialogTitle title="Escolha quem deseja convidar" />}
          overlayPointerEvents="none"
          height="80%"
          width="85%"
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="ACEITAR"
                onPress={() => this.popupDialogCounselor.dismiss()}
                key="dialogButton1"
              />
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="CANCELAR"
                onPress={() => this.cancelInviteList()}
                key="dialogButton2"
              />
            </View>,
          ]}
        >
          <ScrollView key="showInviteCounselorList">
            {this.renderCounselorList()}
          </ScrollView>
        </PopupDialog>
        <Header
          title={'Agendar Reunião'}
          onPress={() => Actions.popTo('mainScreen')}
        />
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <ScrollView
            /* This make the nested ScrollView works. */
            scrollEnabled={this.state.enabled}
          >
            <View>
              <View style={styles.Container}>
                <TouchableOpacity
                  key="openMeetingMap"
                  style={styles.button}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>Escolher Localização</Text>
                </TouchableOpacity>
              </View>

              {this.showLocation()}

              <View style={[styles.Container, { marginVertical: 10 }]}>
                <DatePicker
                  style={styles.Picker}
                  placeholder="Data"
                  date={this.state.meeting.date}
                  mode="date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateInput: {
                      borderRadius: 7,
                    },
                  }}
                  onDateChange={date => this.setState({ meeting: { ...this.state.meeting, date } })}
                />
              </View>

              <View style={styles.Container}>
                <DatePicker
                  style={styles.Picker}
                  placeholder="Horário"
                  date={this.state.meeting.time}
                  mode="time"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateInput: {
                      borderRadius: 7,
                    },
                  }}
                  onDateChange={time => this.setState({ meeting: { ...this.state.meeting, time } })}
                />
              </View>

              <View style={styles.Container}>
                <TouchableOpacity
                  key="searchCounselorButton"
                  style={styles.button}
                  onPress={() => {
                    this.popupDialogCounselor.show();
                    this.getCounselorFromGroup();
                  }}
                >
                  <Text style={styles.buttonText}>Convidar Conselheiros</Text>
                </TouchableOpacity>
              </View>

              {this.showInvitedList()}

              <View behavior="padding">
                <Text style={styles.textDescription}>Descrição da reunião</Text>
                <View style={styles.textBoxDescription}>
                  <TextInput
                    onChangeText={meetingDescription => this.setState(
                      { meeting: { ...this.state.meeting, meetingDescription } })}
                    style={styles.textInput}
                    value={this.state.meetingDescription}
                    maxLength={250}
                    multiline
                    underlineColorAndroid="transparent"
                    placeholder="Opcional( Max: 250 caracteres )"
                  />
                </View>
              </View>
              {this.buttonActivation()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const { shape, string, number, func, bool } = PropTypes;

ScheduleMeeting.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  asyncSchedulingMeeting: func.isRequired,
  asyncGetCounselorFromGroup: func.isRequired,
  setMeetingNewLists: func.isRequired,
  scheduleMeeting: shape({
    meetingLatitude: number.isRequired,
    meetingLongitude: number.isRequired,
  }).isRequired,
  counselor: shape({
    token: string.isRequired,
    nuvemCode: number.isRequired,
  }).isRequired,
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  })).isRequired,
  meetingListOfInviteesWithCounselorInformations: shape({
    nuvemCode: number.isRequired,
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  }).isRequired,
  meetingListOfInvitees: shape({
    nuvemCode: number,
    confirmed: bool,
  }).isRequired,
};
