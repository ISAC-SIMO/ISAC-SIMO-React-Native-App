import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {
  clearImageResponse,
  saveReportData,
} from '../../redux/form/form.actions';
import {
  selectLoading,
  selectImageResponse,
  selectReport,
} from '../../redux/form/form.selectors';

import Snackbar from 'react-native-snackbar';

class index extends Component {
  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    this.maskLength = (width * 90) / 100;
    this.state = {};
  }
  componentWillUnmount() {
    this.props.clearImageResponse();
  }
  saveReport = () => {
    const {response, report} = this.props;
    this.props.saveReportData([...report, response]);
    Snackbar.show({
      text: 'Report Saved!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  render() {
    const {loading, response, report} = this.props;
    console.log(report, 'report');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {/* {data.instruction}  */}
            Result
          </Text>
        </View>
        {loading ? (
          <View
            style={{
              marginHorizontal: 40,
              position: 'absolute',
              alignSelf: 'center',
              marginTop: Dimensions.get('window').height / 1.5 + 20,
            }}>
            <ActivityIndicator size="large" color="darkseagreen" />
            <Text style={{fontSize: 13, alignSelf: 'center', color: '#F2F3F4'}}>
              {' '}
              Please Wait while we are processing the Image...
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            {response && response.image_files
              ? response.image_files.map((each, index) => (
                  <View key={index}>
                    <View
                      style={{
                        height: 200,
                        width: 200,
                        alignSelf: 'center',
                        marginTop: 50,
                        borderColor: '#DEDEDE',
                        borderWidth: 2,
                        overflow: 'hidden',
                        borderRadius: 5,
                      }}>
                      <Image
                        style={{
                          height: undefined,
                          width: undefined,
                          resizeMode: 'contain',
                          flex: 1,
                        }}
                        source={
                          response && response.image_files
                            ? {uri: `${each.file}`}
                            : null
                        }
                      />
                    </View>
                    {each.result === 'Go' ? (
                      <View
                        style={{
                          backgroundColor: 'darkseagreen',
                          height: 60,
                          width: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            alignSelf: 'center',
                            color: '#F2F3F4',
                            textTransform: 'uppercase',
                          }}>
                          {each.result}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'red',
                          height: 60,
                          width: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            alignSelf: 'center',
                            color: '#F2F3F4',
                            textTransform: 'uppercase',
                          }}>
                          {each.result}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        marginTop: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.bodyText}> Score:</Text>
                      <Text style={styles.bodyText}> {each.score * 100}%</Text>
                    </View>
                  </View>
                ))
              : null}

            <View style={styles.footer}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => {
                  this.props.navigation.navigate('Quality');
                  this.props.clearImageResponse();
                }}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Icon name="chevrons-left" color={'#F2F3F4'} size={40} />
                  <Text style={styles.footerText}>Quality Check</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={this.saveReport}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.footerText}>Save Report </Text>
                  <Icon name="plus-circle" color={'#F2F3F4'} size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2F3F4',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#F2F3F4',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F2F3F4',
  },
});

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  response: selectImageResponse,
  report: selectReport,
});

const mapDispatchToProps = {saveReportData, clearImageResponse};

export default connect(mapStateToProps, mapDispatchToProps)(index);
